'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var getOriginWindows = require('../../utils/frames.js').getSameOrigin
var environment = require('../../utils/environment.js')
var locationOrigin = require('../../services/location.js').origin

var window = environment.window

/*
Known issues:


*/

function Transport(name) {
	this.port1 = window.top
	this.port2 = window
	this.listener = null
	this.origin = locationOrigin
	this.name = name
	this.key = generateRandomKey()
}

Transport.supported = Boolean(window.dispatchEvent)
Transport.EVENT_TYPE = 'cross-message'

Transport.prototype = {
	send: function (data) {
		var windows = getOriginWindows(this.port1)
		var index = -1
		var event = window.document.createEvent('Event')
		event.initEvent(Transport.EVENT_TYPE, false, false)
		event.data = new Message(data, this)
		event.origin = this.origin
		event.source = this.port2

		while (++index in windows) {
			windows[index].dispatchEvent(event)
		}
	},

	onMessageEvent: function (handler) {
		var transport = this
		var port2 = transport.port2
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
		port2.removeEventListener(Transport.EVENT_TYPE, transport.listener)
		port2.addEventListener(Transport.EVENT_TYPE, listener)
		transport.listener = listener
	},

	close: function () {
		this.port2.removeEventListener(Transport.EVENT_TYPE, this.listener)
		this.listener = null
	}
}

module.exports = Transport