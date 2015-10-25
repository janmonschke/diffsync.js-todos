var ObserveJS = require('observe-js');
var Backbone = require('backbone');
var _ = require('underscore');
var View = require('./view');
var support = require('./support');
exports = View.extend({
    initialize: function () {
        View.prototype.initialize.apply(this, arguments);
        if (_.isArray(this.model)) {
            this._observer = new ObserveJS.ArrayObserver(this.model);
        }
        else {
            this._observer = new ObserveJS.ObjectObserver(this.model);
        }
        this._changeDetected = this._changeDetected.bind(this);
        this._observer.open(this._changeDetected);
    },
    _changeDetected: function () {
        Backbone.trigger('state:change');
        this.changeDetected.apply(this, arguments);
    },
    changeDetected: function () {
        this.render();
    },
    removeFromCollection: function () {
        if (this.collection) {
            var index = this.collection.indexOf(this.model);
            if (index > -1) {
                this.collection.splice(index, 1);
            }
        }
    },
    remove: function () {
        this._observer.close();
        this._observer = null;
        View.prototype.remove.apply(this);
    }
});
if (!support.OBSERVE) {
    var pollForChanges = function () {
        var is_contained = Object.keys(global).filter(function (e) { return e == 'Platform'; }).length === 0;
        if (is_contained)
            global['Platform'].performMicrotaskCheckpoint();
    };
    window.addEventListener('click', pollForChanges);
    window.addEventListener('touchend', pollForChanges);
    window.addEventListener('submit', pollForChanges);
    Backbone.on('state:sync', pollForChanges);
}
