'use strict';

var CrossMessage = require('./message.js')
var HandlersCollection = require('./handlerscollection.js')
var channels = require('./channels.js')
var Protocol = require('./protocol.js')

function CrossChannel(name) {
	if (!arguments.length) {
		throw new TypeError('Failed to construct \'CrossChannel\': 1 argument required, but only 0 present')
	}
	if (!(this instanceof CrossChannel)) {
		throw TypeError('Failed to construct \'BroadcastChannel\': Please use the \'new\' operator, this constructor cannot be called as a function.')
	}
	var crosschannel = this;
	this.name = String(name)
	this.onmessage = null
	this.onclose = null//???????
	this.onerror = null//???????
	this.closed = false
	this.messageHandlers = new HandlersCollection()

	if (false && name in channels) {//!!!!!!!!!!!!
		this.channel = channels[this.name]
	}
	else {
		this.channel = new Protocol(this.name)
		channels[this.name] = this.channel
	}

	this.channel.onRecieve(function(message){
		crosschannel.messageHandlers.handle(message)
		if (typeof crosschannel.onmessage === 'function') {
			crosschannel.onmessage(event)
		}
	})
}

CrossChannel.prototype.on =
CrossChannel.prototype.addEventListener = function (type, handler) {
	this.messageHandlers.push(handler)
}

CrossChannel.prototype.removeEventListener = function (type, handler) {
	this.messageHandlers.remove(handler)
}

CrossChannel.prototype.removeAllListeners = function () {
	this.messageHandlers.empty()
}

CrossChannel.prototype.postMessage = function (message) {
	if (!arguments.length) {
		throw new TypeError('Failed to execute \'postMessage\' on \'CrossChannel\': 1 argument required, but only 0 present.')
	}
	if (this.closed) {
		return
	}
	var message = new CrossMessage(message);
	this.channel.send(message)
}

CrossChannel.prototype.close = function (params) {
	this.channel.close()
	this.messageHandlers.empty()
	this.closed = true
}

CrossChannel.prototype.valueOf = function (params) {
	return '[object CrossChannel]'
}

module.exports = CrossChannel

//globalScope.channel = channel;
//globalScope.emitter = emitter;