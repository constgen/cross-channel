'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var environment = require('../utils/environment.js')

var global = environment.global
/*
Reference:
https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API/Using_channel_messaging
 */

function Transport (name){
	var transport = new global.MessageChannel()
	this.port1 = transport.port1
	this.port2 = transport.port1
	this.name = name
}

Transport.supported = Boolean(global.MessageChannel)

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