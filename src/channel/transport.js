'use strict'

var PostMessageCrossTransport = require('./transports/postmessage.cross.transport.js')
var PostMessageOriginTransport = require('./transports/postmessage.origin.transport.js')
var NwTransport = require('./transports/nw.transport.js')
var BlankTransport = require('./transports/blank.transport.js')
var ExtensionTransport = require('./transports/extension.transport.js')
var BroadcastChannelTransport = require('./transports/broadcastchannel.transport.js')

module.exports = {
	SameOrigin: (function () {
		switch (true) {
			case ExtensionTransport.supported: return ExtensionTransport
			case BroadcastChannelTransport.supported: return BroadcastChannelTransport
			case NwTransport.supported: return NwTransport
			//case PostMessageOriginTransport.supported: return PostMessageOriginTransport
			default: return BlankTransport
		}
	}()),
	CrossOrigin:  (function () {
		switch (true) {
			case PostMessageCrossTransport.supported: return PostMessageCrossTransport
			default: return BlankTransport
		}
	}())
} 

