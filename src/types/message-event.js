'use strict'

var environment = require('../utils/environment.js')

var window = environment.window
var EventConstructor = window.MessageEvent || Object

function MessageEvent(config) {
	config = config || {}
	var message = config.data || {}

	if (typeof message === 'string') {
		try {
			message = JSON.parse(message)
		} catch (err) {
			console.error(err, event);
		}
	}

	Object.defineProperties(this, {
		'type': {
			value: 'message',
			writable: false
		},
		'data': {
			value: message.data, //extract usefull data from a message
			writable: false
		},
		'timeStamp': {
			value: config.timeStamp || 0,
			writable: false
		},
		'origin': {
			value: config.origin || config.url || '',
			writable: false
		},
		'key': {
			value: message.key,
			writable: false
		},
		'sourceChannel': {
			value: message.sourceChannel,
			writable: false
		}
	});
}

MessageEvent.prototype = Object.create(
	EventConstructor.prototype, 
	{constructor: { writable: true, configurable: true, value: MessageEvent }}
)

module.exports = MessageEvent