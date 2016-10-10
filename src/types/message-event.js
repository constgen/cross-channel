'use strict';

var environment = require('../utils/environment.js')

var window = environment.window
var EventConstructor = window.MessageEvent || Object

function MessageEvent(config) {
	config = config || {}
	var message = config.data || {}


	// if (!message) {
	// 	return this; //EXIT, if message is empty
	// }

	if (typeof message === 'string') {
		try {
			message = JSON.parse(message)
		} catch (err) {
			console.error(err, event);
		}
	}

		//connextionMessageRegExp = /^__([A-Za-z]+?)__:/;
		// connectionCretaria,
		// connectionType,
		// connectionMatch,
		// data;

		// //parse message without try-catch
		// if (message && typeof message === 'string') {
		// 	connectionMatch = message.match(connextionMessageRegExp);

		// 	if (connectionMatch) {
		// 		connectionCretaria = connectionMatch[0];
		// 		connectionType = connectionMatch[1];
		// 		if (connectionType === messageType) {
		// 			data = JSON.parse(message.substr(connectionCretaria.length));
		// 		}
		// 	}
		// }

	Object.defineProperties(this, {
		'data': {
			value: message.data, //extract usefull data from a message
			writable: false
		},
		'timeStamp': {
			value: config.timeStamp || 0,
			writable: false
		},
		'origin': {
			value: config.origin || '',
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

MessageEvent.prototype = Object.create(EventConstructor.prototype)
MessageEvent.prototype.constructor = MessageEvent

module.exports = MessageEvent