'use strict'

var MessageEvent = require('../types/message-event.js')
var Message = require('../types/message.js')
var generateRandomKey = require('../utils/generate-random-key.js')
var getAllChildWindows = require('../utils/get-all-child-windows.js')
var environment = require('../utils/environment.js')

/*
Known issues:
1. From NW to child window - NO
2. From child window to NW - NO
3. From child frame to child window - NO
4. From child window to child frame - NO
5. <iframe nwfaketop> disables message bubbling to the parent frame
*/

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
	}, 4)
}

function getNWWindowThen(callback) {
	whenGuiReadyThen(function (gui) {
		var nwWindow = gui.Window.get()
		callback(nwWindow)
	})
}

function Transport(name) {
	var transport = this
	// this.port - computed value
	this.origin = '*' //location = window.location, location && (location.origin || (location.protocol + '//' + location.host)) || '*'
	this.listener = null
	this.name = name
	this.key = generateRandomKey()

	this.nwLoadedListener = function () {
		var listener = transport.listener
		var port = transport.port
		if (listener) {
			//port.removeEventListener(Transport.EVENT_TYPE, listener)
			port.addEventListener(Transport.EVENT_TYPE, listener)
		}
	}
	getNWWindowThen(function (nwWindow) {
		//listen when page is refreshed
		nwWindow.on('loaded', transport.nwLoadedListener)
	})
}

Transport.supported = Boolean(environment.is.node && environment.is.nw)
Transport.EVENT_TYPE = 'message'

//computed `this.port`
Object.defineProperty(Transport.prototype, 'port', {
	get: function () {
		return global.window
	},
	set: function (value) { }
})

Transport.prototype.send = function (data) {
	var transport = this
	var origin = this.origin
	var message = new Message(data, this)
	getNWWindowThen(function (nwWindow) {
		var browserWindow = transport.port
		var topBrowserWindow = browserWindow.top
		var browserFrames = topBrowserWindow && [topBrowserWindow].concat(getAllChildWindows(topBrowserWindow)) || [];

		// try {
		// 	if (global.__nwWindowsStore) {
		// 		browserFrames = Object.keys(global.__nwWindowsStore)
		// 			.map(function(id) {
		// 				return global.__nwWindowsStore[id];
		// 			})
		// 			.map(function(nwWindow) {
		// 				var browserWindow = nwWindow.window;
		// 				return browserWindow.top && [browserWindow.top].concat(channel.getAllChildWindows(browserWindow.top)) || []
		// 			})
		// 			.reduce(function(allBrowserWindows, browserWindows) {
		// 				return allBrowserWindows.concat(browserWindows)
		// 			}, [])
		// 	}
		// }
		// catch (err) {
		// 	setTimeout(console.error.bind(console, err), 4000)
		//
		// }

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
		var event = nativeMessageEventWorks ? (new window.MessageEvent(Transport.EVENT_TYPE, e)) : e //fixes crashes in NWjs, when read `e.data`
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

	getNWWindowThen(function () {
		var port = transport.port
		port.removeEventListener(Transport.EVENT_TYPE, transport.listener)
		port.addEventListener(Transport.EVENT_TYPE, listener)
		transport.listener = listener
	})

}

Transport.prototype.close = function () {
	var transport = this
	getNWWindowThen(function (nwWindow) {
		transport.port.removeEventListener(Transport.EVENT_TYPE, transport.listener)
		transport.listener = null
		nwWindow.removeListener('loaded', transport.nwLoadedListener)
	})
}

module.exports = Transport
