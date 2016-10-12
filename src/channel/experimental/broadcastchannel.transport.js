'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var environment = require('../utils/environment.js')

var global = environment.global

function Transport (name){
	this.port = new global.BroadcastChannel(name)
}

Transport.supported = Boolean(global.BroadcastChannel)
Transport.EVENT_TYPE = 'message'

Transport.prototype.send = function(data){
	var message = new Message(data)
	this.port.postMessage(message)
}

Transport.prototype.onMessageEvent = function(handler){
	this.port.addEventListener(Transport.EVENT_TYPE, function(event){
		var messageEvent = new MessageEvent(event)
		handler(messageEvent)
	})
}

Transport.prototype.close = function(){
	this.port.close()
}

module.exports = Transport