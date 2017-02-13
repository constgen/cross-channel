'use strict'

var noop = require('../../utils/noop.js')

function Transport() {}

Transport.prototype = {
	constructor: Transport,
	send: noop,
	onMessageEvent: noop,
	close: noop
}

module.exports = Transport