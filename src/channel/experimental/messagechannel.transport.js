'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')

function Transport (name){
	var transport = new MessageChannel(id)
	this.port1 = transport.port1
	this.port2 = transport.port1
	this.name = name
}

Transport.prototype.send = function(data){
	var message = new Message(data)
	this.port1.postMessage(message)
}

Transport.prototype.onMessageEvent = function(handler){
	this.port2.onmessage = function(event){
		var messageEvent = new MessageEvent(event)
		handler(messageEvent)
	}
}

Transport.prototype.close = function(){
	this.port2.onmessage = null
}


module.exports = Transport