var ObserverView = require('./observer-view');
var escape = require('lodash.escape');
var ItemView = ObserverView.extend({
    tagName: 'li',
    className: 'item',
    events: {
        'click button': 'removeTodo'
    },
    template: function (model) {
        return '<span class="itemText">' + escape(model.text) + '</span><button>done</button>';
    },
    removeTodo: function () {
        var index = this.collection.indexOf(this.model);
        if (index > -1) {
            this.collection.splice(index, 1);
        }
    }
});
exports = ItemView;
