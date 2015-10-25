/// <reference path='../typings/underscore/underscore.d.ts' />
/// <reference path='../typings/node/node.d.ts' />

interface ObjectConstructor {
    observe(beingObserved: any, callback: (update: any) => any): void;
}

interface ArrayConstructor {
    observe(beingObserved: any, callback: (update: any) => any): void;
}

import _ = require('underscore');


const support: { IS_MOBILE: boolean, OBSERVE: boolean } = {
    IS_MOBILE: 'ontouchstart' in window,
    OBSERVE: _.isFunction(Object.observe) && _.isFunction(Array.observe)
};

exports = support;
