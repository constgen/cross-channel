'use strict'

var SameOriginTransport = require('./transport.js').SameOrigin
var CrossOriginTransport = require('./transport.js').CrossOrigin

function Channel(id) {
	this.sameTransport = new SameOriginTransport(id)
	this.crossTransport = new CrossOriginTransport(id)
}

Channel.prototype = {
	constructor: Channel,
	send: function (data) {
		this.sameTransport.send(data)
		this.crossTransport.send(data)
	},
	onMessageEvent: function (handler) {
		this.sameTransport.onMessageEvent(handler)
		this.crossTransport.onMessageEvent(handler)
	},
	close: function () {
		this.sameTransport.close()
		this.crossTransport.close()
	}
}

module.exports = Channel




