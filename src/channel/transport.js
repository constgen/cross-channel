'use strict'

var PostMessageCrossTransport = require('./transports/postmessage.cross.transport.js')
var PostMessageTransport = require('./transports/postmessage.transport.js')
var NodeWebkitTransport = require('./transports/node-webkit.transport.js')
var BlankTransport = require('./transports/blank.transport.js')
var ExtensionTransport = require('./transports/extension.transport.js')
var BroadcastChannelTransport = require('./transports/broadcastchannel.transport.js')
var StorageTransport = require('./transports/storage.transport.js')
var EventEmitterTransport = require('./transports/eventemitter.transport.js')
var PipeTransport = require('./transports/pipe.transport.js')

var SameOrigin = (function () {
	switch (true) {
		case ExtensionTransport.supported: return ExtensionTransport
		case BroadcastChannelTransport.supported: return BroadcastChannelTransport
		case StorageTransport.supported: return StorageTransport
		case PostMessageTransport.supported: return PostMessageTransport
		case PipeTransport.supported: return PipeTransport
		case EventEmitterTransport.supported: return EventEmitterTransport
		default: return BlankTransport
	}
}())

var CrossOrigin = (function () {
	switch (true) {
		case SameOrigin === PostMessageTransport: return BlankTransport
		case NodeWebkitTransport.supported: return NodeWebkitTransport
		case PostMessageCrossTransport.supported: return PostMessageCrossTransport
		default: return BlankTransport
	}
}())

module.exports = {
	SameOrigin: SameOrigin,
	CrossOrigin: CrossOrigin
}

