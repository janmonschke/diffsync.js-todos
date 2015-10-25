/// <reference path='../typings/observe-js/observe-js.d.ts' />
/// <reference path='../typings/backbone/backbone.d.ts' />
/// <reference path='../typings/underscore/underscore.d.ts' />

import ObserveJS = require('observe-js');
import Backbone = require('backbone');
import _ = require('underscore');
import View = require('./view');
import support = require('./support');

exports = View.extend({
    initialize: function() {
        View.prototype.initialize.apply(this, arguments);
        if (_.isArray(this.model)) {
            this._observer = new ObserveJS.ArrayObserver(this.model);
            // Array.observe(this.model, function(){
            //   console.log(name, 'changed', arguments);
            // });
        } else {
            this._observer = new ObserveJS.ObjectObserver(this.model);
            // Object.observe(this.model, function(){
            //   console.log(name, 'changed', arguments);
            // })
        }

        this._changeDetected = this._changeDetected.bind(this);
        this._observer.open(this._changeDetected);
    },

    _changeDetected: function() {
        Backbone.trigger('state:change');
        this.changeDetected.apply(this, arguments);
    },

    changeDetected: function() {
        this.render();
    },

    removeFromCollection: function() {
        if (this.collection) {
            var index = this.collection.indexOf(this.model);
            if (index > -1) {
                this.collection.splice(index, 1);
            }
        }
    },

    remove: function() {
        this._observer.close();
        this._observer = null;
        View.prototype.remove.apply(this);
    }
});

////////////////////
// Needs polling? //
////////////////////

// If there is no support, activate polling
// see: https://github.com/polymer/observe-js#about-delivery-of-changes
if (!support.OBSERVE) {
    let pollForChanges = function() {
        /* global Platform */
        const is_contained: boolean = Object.keys(global).filter(function(e) { return e == 'Platform'; }).length === 0;
        if (is_contained) global['Platform'].performMicrotaskCheckpoint();
    };

    // var POLL_INTERVAL_TIMEOUT = 100;
    // setInterval(pollForChanges, POLL_INTERVAL_TIMEOUT);

    window.addEventListener('click', pollForChanges);
    window.addEventListener('touchend', pollForChanges);
    window.addEventListener('submit', pollForChanges);
    Backbone.on('state:sync', pollForChanges);
}
