'use strict'

//var Symbol = require('es6-symbol')
var MessageEvent = require('../types/message-event.js')
var Message = require('../types/message.js')
var generateRandomKey = require('../utils/generate-random-key.js')
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

function Transport(name) {
	this.origin = '*' //location = window.location, location && (location.origin || (location.protocol + '//' + location.host)) || '*'
	this.listener = null
	this.name = name
	this.key = generateRandomKey()
}

Transport.supported = Boolean(global.window)

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
	var browserWindow = this.port
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
	var port = this.port
	function listener(e) {
		var window = this
		var nativeMessageEventWorks = window.MessageEvent && window.MessageEvent.length
		var event = nativeMessageEventWorks ? (new window.MessageEvent('message', e)) : e //fixes crashes in NWjs, when read `e.data`
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
	port.removeEventListener('message', this.listener)
	port.addEventListener('message', listener)
	this.listener = listener
}

Transport.prototype.close = function () {
	this.port.removeEventListener('message', this.listener)
	this.listener = null
}

module.exports = Transport