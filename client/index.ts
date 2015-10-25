/// <reference path='../typings/backbone/backbone.d.ts' />
/// <reference path='../typings/socket.io-client/socket.io-client.d.ts' />
/// <reference path='../cust_typings/diffsync/diffsync.d.ts' />

import DiffSync = require('diffsync')
const DiffSyncClient = DiffSync.Client;
import socketIOClient = require('socket.io-client');
import Backbone = require('backbone');
import ObserverCollectionView = require('./observer-collection-view');
import ItemView = require('./item-view');

var todoList: string = location.href.split('/').pop();

var client = new DiffSyncClient(socketIOClient(), todoList);

client.on('connected', function() {
    let TodoListView = ObserverCollectionView.extend({
        ViewClass: ItemView,
        tagName: 'ol',
        attributes: {
            id: 'todos'
        }
    });

    var theListView = new TodoListView(client.getData().todos);
    document.getElementById('todosContainer').appendChild(theListView.render().el);

    let todoText: HTMLInputElement = <HTMLInputElement>document.getElementById('todoText');
    let todoForm: HTMLFormElement = <HTMLFormElement>document.getElementById('todoForm');
    let todoButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('todoButton');

    let addTodoAction = function(event) {
        event.preventDefault();

        const text = todoText.value;

        if (text) {
            client.getData().todos.push({
                text: todoText.value,
                id: Math.random() + ''
            });

            todoText.value = '';
            todoText.focus();
        }
    };

    todoButton.addEventListener('click', addTodoAction);
    todoForm.addEventListener('click', addTodoAction);
});

client.on('synced', function() {
    Backbone.trigger('state:sync');
});

client.on('error', function(error) {
    console.error(error);
});

Backbone.on('state:change', function() {
    client.schedule();
});

client.initialize();
