'use strict'

var Symbol = require('es6-symbol')
var PostMessageTransport = require('./postmessage.transport.js')
var MessageEvent = require('../types/message-event.js')
var Message = require('../types/message.js')
var getAllChildWindows = require('../utils/get-all-child-windows.js')
var environment = require('../utils/environment.js')

var global = environment.global

function getGUI(window) {
	return window && window.nwDispatcher.requireNwGui()
}

function whenGuiReadyThen(callback) {
	var gui = getGUI(global.window)
	if (gui) {
		callback(gui)
		return
	}
	var timerId = setInterval(function () {
		gui = getGUI(global.window)
		if (gui) {
			clearInterval(timerId)
			callback(gui)
		}
	}, 10)
}

function getNWWindowThen(callback) {
	whenGuiReadyThen(function (gui) {
		var nwWindow = gui.Window.get()
		callback(nwWindow)
	})
}

// getNWWindowThen(function (nwWindow) {
// 	//listen, when new page is open
// 	nwWindowwin.on('loaded', function () {
// 		var browserWindow = global.window;
// 		//listen main window only once
// 		if (!browserWindow[omen]) {
// 			browserWindow[omen] = true; //mark as listened by Node
// 			attachMessageHandlers();
// 		}
// 	});
// });

function Transport(id) {
	PostMessageTransport.call(this, id)
	delete this.port //clear reference to a window
}
Transport.prototype = Object.create(PostMessageTransport.prototype)
Transport.prototype.constructor = Transport
//computed `this.port`
Object.defineProperty(Transport.prototype, 'port', {
	get: function () {
		return global.window
	},
	set: function (value) {}
})

Transport.prototype.send = function (data) {
	var origin = this.origin
	var message = new Message(data, this)
	var browserWindow = this.port || {}
	var topBrowserWindow = browserWindow.top
	var browserFrames = topBrowserWindow && [topBrowserWindow].concat(getAllChildWindows(topBrowserWindow)) || [];

	getNWWindowThen(function(nwWindow) {
		var index = -1
		while (++index in browserFrames) {
			//.replace(/'/g, '\\\'')
			nwWindow.eval(browserFrames[index].frameElement || null, 'window.postMessage(' + JSON.stringify(message.asJSON()) + ', "' + origin + '")')	
		}
	})
}

Transport.prototype.onMessageEvent = function (handler) {
	var transport = this
	function listener(e) {
		var window = this
		var nativeMessageEventWorks = window.MessageEvent && window.MessageEvent.length
		var event = nativeMessageEventWorks ? (new window.MessageEvent('message', e)) : e //fixes crashes in NWjs, when read `e.data`
		var messageEvent = new MessageEvent(event)
		
		if (
			('key' in messageEvent) 
			&& ('sourceChannel' in messageEvent)
			&& transport.name === messageEvent.sourceChannel
			&& transport.key !== messageEvent.key //skip events that was returned back or are not native
		) { 
			handler(messageEvent)
		}
	}
	if (this.port && this.port.addEventListener) {
		this.port.addEventListener('message', listener)
		this.listeners.push(listener)
	}
}

// Transport.prototype.close = function () {
// 	var listeners = this.listeners
// 	var port = this.port
// 	var index = listeners.length
// 	while (index--) {
// 		port.removeEventListener('message', listeners[index])
// 	}
// 	this.listeners.length = 0
// }

module.exports = Transport