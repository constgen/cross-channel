'use strict'

var MessageEvent = require('../types/message-event.js')
var Message = require('../types/message.js')
var generateRandomKey = require('../utils/generate-random-key.js')
var getAllChildWindows = require('../utils/get-all-child-windows.js')
var environment = require('../utils/environment.js')

var global = environment.global
var window = environment.window

function Transport(name) {
	this.port1 = window.top
	this.port2 = global
	this.origin = '*' //location = window.location, location && (location.origin || (location.protocol + '//' + location.host)) || '*'
	this.listener = null
	this.name = name
	this.key = generateRandomKey()
}

Transport.prototype.send = function (data) {
	var origin = this.origin
	var message = new Message(data, this)
	var childWindows = getAllChildWindows(this.port1)
	var index = -1

	this.port1.postMessage(message, origin)
	while (++index in childWindows) {
		try {
			childWindows[index].postMessage(message, origin)
		} catch (err) {
			console.error(err, data);
			//var e;
			//e = win.document.createEvent('Event')
			//e.initEvent('message', false, false)
			//e.data = message
			//e.origin = this.origin
			//e.source = window
			//win.dispatchEvent(e)
		}
	}
}

Transport.prototype.onMessageEvent = function (handler) {
	var transport = this
	var port2 = this.port2
	function listener(event) {
		var messageEvent = new MessageEvent(event)
		if (
			('key' in messageEvent) 
			&& ('sourceChannel' in messageEvent)
			&& transport.name === messageEvent.sourceChannel //events on the same channel
			&& transport.key !== messageEvent.key //skip returned back events
		) { 
			handler(messageEvent)
		}
	}
	port2.removeEventListener('message', this.listener)
	port2.addEventListener('message', listener)
	this.listener = listener
}

Transport.prototype.close = function () {
	this.port2.removeEventListener('message', this.listener)
	this.listener = null
}


module.exports = Transport