'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')

function Transport (name){
	this.port = new BroadcastChannel(name)
}

Transport.prototype.send = function(data){
	var message = new Message(data)
	this.port.postMessage(message)
}

Transport.prototype.onMessageEvent = function(handler){
	this.port.addEventListener('message', function(event){
		var messageEvent = new MessageEvent(event)
		handler(messageEvent)
	})
}

Transport.prototype.close = function(){
	this.port.close()
}

module.exports = Transport