'use strict'

var noop = function(){}

function Transport() {}

Transport.prototype.send = noop
Transport.prototype.onMessageEvent = noop
Transport.prototype.close = noop

module.exports = Transport