'use strict'

var MessageEvent = require('../types/message-event.js')
var Message = require('../types/message.js')
var generateRandomKey = require('../utils/generate-random-key.js')
var getAllChildWindows = require('../utils/get-all-child-windows.js')
var environment = require('../utils/environment.js')

var global = environment.global

function Transport() {
	this.port = global.window
	this.origin = '*' //location = global.window.location, location && (location.origin || (location.protocol + '//' + location.host)) || '*'
	this.listeners = []
	this.key = generateRandomKey()
}

Transport.prototype.send = function (data) {
	var origin = this.origin
	var message = new Message(data, this.key)
	var index = -1
	var browserWindow = global.window || {}
	var topBrowserWindow = browserWindow.top
	var browserFrames = topBrowserWindow && [topBrowserWindow].concat(getAllChildWindows(topBrowserWindow)) || [];

	//this.port.postMessage(message, origin) //!!!!!!!!!!!!!!!!!!!!
	while (++index in browserFrames) {
		try {
			browserFrames[index].postMessage(message, origin)
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
	function listener(event) {
		var messageEvent = new MessageEvent(event)
		if (('key' in messageEvent) && transport.key !== messageEvent.key) { //skip events that was returned back or are not native
			handler(messageEvent)
		}
	}
	if (this.port && this.port.addEventListener) {
		this.port.addEventListener('message', listener)
		this.listeners.push(listener)
	}
}

Transport.prototype.close = function () {
	var listeners = this.listeners
	var port = this.port
	var index = listeners.length
	while (index--) {
		port.removeEventListener('message', listeners[index])
	}
	this.listeners.length = 0
}


module.exports = Transport