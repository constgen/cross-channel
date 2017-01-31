'use strict'

var noop = require('../../utils/noop.js')

function Transport() {}

Transport.prototype.send = noop
Transport.prototype.onMessageEvent = noop
Transport.prototype.close = noop

module.exports = Transport