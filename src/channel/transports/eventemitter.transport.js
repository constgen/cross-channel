'use strict'

var EventEmitter = require('events')
var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var environment = require('../../utils/environment.js')
var noop = require('../../utils/noop.js')

var eventEmitter

function Transport(name) {
	eventEmitter = eventEmitter || new EventEmitter()
	eventEmitter.setMaxListeners(Infinity)
	this.port = eventEmitter
	this.name = name
	this.listener = noop
	this.key = generateRandomKey()
}

Transport.supported = Boolean(environment.is.node)
Transport.EVENT_TYPE = 'message'

Transport.prototype = {
	constructor: Transport,

	send: function (data) {
		var message = new Message(data, this)
		var port = this.port
		var event = {
			data: message
		}
		setImmediate(function () {
			port.emit(Transport.EVENT_TYPE, event)
		})
	},

	onMessageEvent: function (handler) {
		var transport = this
		var port = this.port
		function listener(event) {
			var messageEvent = new MessageEvent(event)
			
			if (
				transport.name === messageEvent.sourceChannel //events on the same channel
				&& transport.key !== messageEvent.key //skip returned back events
			) {
				handler(messageEvent)
			}
		}
		port.removeListener(Transport.EVENT_TYPE, transport.listener)
		port.on(Transport.EVENT_TYPE, listener)
		transport.listener = listener
	},

	close: function () {
		this.port.removeListener(Transport.EVENT_TYPE, this.listener)
		this.listener = noop
	}
}

module.exports = Transport