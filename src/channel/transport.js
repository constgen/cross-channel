'use strict'

var PostMessageTransport = require('./transports/postmessage.transport.js')
var NwTransport = require('./transports/nw.transport.js')
var BlankTransport = require('./transports/blank.transport.js')
var ExtensionTransport = require('./transports/extension.transport.js')

module.exports = (function () {
	// return require('./experimental/broadcastchannel.transport.js')
	// return require('./experimental/storage.transport.js')
	// return require('./experimental/eventemitter.transport.js')
	// return require('./experimental/chrome.transport.js')
	switch (true) {
		case ExtensionTransport.supported: return ExtensionTransport
		case NwTransport.supported: return NwTransport
		case PostMessageTransport.supported: return PostMessageTransport
		default: return BlankTransport
	}
}())

