'use strict';

var HandlersCollection = require('./types/handlers-collection.js')
var Channel = require('./channel/channel.js')
var window = require('./utils/environment.js').window

function CrossChannel(name) {
	var crosschannel = this
	if (!arguments.length) {
		throw new TypeError('Failed to construct \'CrossChannel\': 1 argument required, but only 0 present.')
	}
	if (!(this instanceof CrossChannel)) {
		throw new TypeError('Failed to construct \'CrossChannel\': Please use the \'new\' operator, this constructor cannot be called as a function.')
	}
	this.name = String(name)
	this.onmessage = null
	this.closed = false
	this.messageHandlers = new HandlersCollection()

	this.channel = new Channel(this.name)

	this.channel.onMessageEvent(function(event){
		crosschannel.messageHandlers.handle(event)
		if (typeof crosschannel.onmessage === 'function') {
			crosschannel.onmessage(event)
		}
	})
}

CrossChannel.prototype = {
	constructor: CrossChannel,

	addEventListener: function (type, handler) {
		if (type === 'message') {
			this.messageHandlers.push(handler)
		}
	},

	removeEventListener: function (type, handler) {
		if (type === 'message') {
			this.messageHandlers.remove(handler)
		}
	},

	removeAllListeners: function () {
		this.messageHandlers.empty()
	},

	once: function (type, handler) {
		var crosschannel = this
		function removeHandler() {
			crosschannel.messageHandlers.remove(handler)
			crosschannel.messageHandlers.remove(removeHandler)
		}
		if (type === 'message') {
			crosschannel.messageHandlers.push(handler)
			crosschannel.messageHandlers.push(removeHandler)
		}
	},

	postMessage: function (message) {
		if (!arguments.length) {
			throw new TypeError('Failed to execute \'postMessage\' on \'CrossChannel\': 1 argument required, but only 0 present.')
		}
		if (this.closed) {
			return
		}
		this.channel.send(message)
	},

	close: function () {
		this.channel.close()
		this.messageHandlers.empty()
		this.closed = true
	},

	valueOf: function () {
		return '[object CrossChannel]'
	}
}

//shortcut
CrossChannel.prototype.on = CrossChannel.prototype.addEventListener

module.exports = CrossChannel
window.CrossChannel = CrossChannel