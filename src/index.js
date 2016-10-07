'use strict';

var MessageEvent = require('./message-event.js')
var HandlersCollection = require('./handlers-collection.js')
var channels = require('./channels.js')
var Channel = require('./channel/channel.js')

function CrossChannel(name) {
	var crosschannel = this
	if (!arguments.length) {
		throw new TypeError('Failed to construct \'CrossChannel\': 1 argument required, but only 0 present')
	}
	if (!(this instanceof CrossChannel)) {
		throw TypeError('Failed to construct \'BroadcastChannel\': Please use the \'new\' operator, this constructor cannot be called as a function.')
	}
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
		this.channel = new Channel(this.name)
		channels[this.name] = this.channel
	}

	this.channel.onRecieve(function(message){
		var event = new MessageEvent(message)
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

CrossChannel.prototype.once = function(type, handler){
	var crosschannel = this
	function removeHandler(){
		crosschannel.messageHandlers.remove(handler)
		crosschannel.messageHandlers.remove(removeHandler)
	}
	this.messageHandlers.push(handler)
	this.messageHandlers.push(removeHandler)
}

CrossChannel.prototype.postMessage = function (message) {
	if (!arguments.length) {
		throw new TypeError('Failed to execute \'postMessage\' on \'CrossChannel\': 1 argument required, but only 0 present.')
	}
	if (this.closed) {
		return
	}
	this.channel.send(message)
}

CrossChannel.prototype.close = function () {
	this.channel.close()
	this.messageHandlers.empty()
	this.closed = true
}

CrossChannel.prototype.valueOf = function () {
	return '[object CrossChannel]'
}

module.exports = CrossChannel