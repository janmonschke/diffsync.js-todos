var _ = require('underscore');
var support = {
    IS_MOBILE: 'ontouchstart' in window,
    OBSERVE: _.isFunction(Object.observe) && _.isFunction(Array.observe)
};
exports = support;
