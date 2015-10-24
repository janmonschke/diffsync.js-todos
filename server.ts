/// <reference path='typings/node/node.d.ts' />
/// <reference path='typings/hapi/hapi.d.ts' />
/// <reference path='typings/socket.io/socket.io.d.ts' />

import Hapi = require('hapi');
import socket_io = require('socket.io');
import dataAdapter = require('./data-adapter');

const databaseName = process.env.db_name;

var database = require('./database')(databaseName);
var diffsync = require('diffsync');

const isProduction = process.env.NODE_ENV === 'production';
let DiffSyncServer = diffsync.Server;
let hapiServer = new Hapi.Server();
hapiServer.connection({ port: process.env.PORT || 4000 });

let io = socket_io(hapiServer.listener);
let realtimeServer = new DiffSyncServer(dataAdapter(databaseName), io);

hapiServer.views({
    engines: {
        hbs: require('handlebars')
    },
    path: './templates',
    relativeTo: __dirname,
    isCached: isProduction
});

hapiServer.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply.view('index', {
            activeConnections: io.engine.clientsCount
        });
    }
});

hapiServer.route({
    method: 'GET',
    path: '/todos/{name}',
    handler: function(request: {params: any}, reply: Hapi.IReply) {
        var name = encodeURIComponent(request.params.name),
            renderTodos = function() {
                reply.view('todos', {
                    name: name
                });
            };

        // fetch the todolist
        database.get(name, function(err, doc) {
            // if list does not exist, create it
            if (err || !doc) {
                database.save(name, { todos: [] }, function() {
                    renderTodos();
                });
            } else {
                renderTodos();
            }
        });
    }
});

hapiServer.route({
    method: 'GET',
    path: '/client/{path*}',
    handler: {
        directory: {
            path: './client'
        }
    }
});

hapiServer.start(function() {
    console.log('Server is up and running!');
});
