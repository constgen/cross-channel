'use strict'

var Transport = require('./transport.js')
var Transition = require('./transition.js')


function Channel(id) {
	this.transport = new Transport(id)
	this.transition = new Transition(id)
}

Channel.prototype = {
	constructor: Channel,
	send: function (data) {
		this.transition.send(data)
		this.transport.send(data)
	},
	onMessageEvent: function (handler) {
		var transport = this.transport
		var transition = this.transition
		this.transport.onMessageEvent(function (event) {
			handler(event)
			// transition.send(event.data)
		})
		this.transition.onMessageEvent(function (event) {
			handler(event)
			// transport.send(event.data)
		})
	},
	close: function () {
		this.transport.close()
		this.transition.close()
	}
}

module.exports = Channel




