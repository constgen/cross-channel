'use strict'

var PostMessageCrossTransport = require('./transports/postmessage.cross.transport.js')
var PostMessageOriginTransport = require('./transports/postmessage.origin.transport.js')
var PostMessageTransport = require('./transports/postmessage.transport.js')
var NwTransport = require('./transports/nw.transport.js')
var BlankTransport = require('./transports/blank.transport.js')
var ExtensionTransport = require('./transports/extension.transport.js')
var BroadcastChannelTransport = require('./transports/broadcastchannel.transport.js')
var StorageTransport = require('./transports/storage.transport.js')


var SameOrigin = (function () {
	switch (true) {
		case ExtensionTransport.supported: return ExtensionTransport
		case BroadcastChannelTransport.supported: return BroadcastChannelTransport
		case StorageTransport.supported: return StorageTransport
		case NwTransport.supported: return NwTransport
		//case PostMessageOriginTransport.supported: return PostMessageOriginTransport
		case PostMessageTransport.supported: return PostMessageTransport
		default: return BlankTransport
	}
}())

var CrossOrigin = (function () {
	switch (true) {
		case SameOrigin === PostMessageTransport: return BlankTransport
		case PostMessageCrossTransport.supported: return PostMessageCrossTransport
		default: return BlankTransport
	}
}())

module.exports = {
	SameOrigin: SameOrigin,
	CrossOrigin: CrossOrigin
} 

