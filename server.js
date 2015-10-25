var Hapi = require('hapi');
var socket_io = require('socket.io');
var diffsync = require('diffsync');
var dataAdapter = require('./data-adapter');
var createDatabase = require('./database');
var databaseName = process.env.db_name;
var database = createDatabase(databaseName);
var isProduction = process.env.NODE_ENV === 'production';
var DiffSyncServer = diffsync.Server;
var hapiServer = new Hapi.Server();
hapiServer.connection({ port: process.env.PORT || 4000 });
var io = socket_io(hapiServer.listener);
var realtimeServer = new DiffSyncServer(dataAdapter(databaseName), io);
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
    handler: function (request, reply) {
        reply.view('index', {
            activeConnections: io.engine.clientsCount
        });
    }
});
hapiServer.route({
    method: 'GET',
    path: '/todos/{name}',
    handler: function (request, reply) {
        var name = encodeURIComponent(request.params.name), renderTodos = function () {
            reply.view('todos', {
                name: name
            });
        };
        database.get(name, function (err, doc) {
            if (err || !doc) {
                database.save(name, { todos: [] }, function () {
                    renderTodos();
                });
            }
            else {
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
hapiServer.start(function () {
    console.log('Server is up and running!');
});
