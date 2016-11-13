'use strict'

var BlankTransport = require('./transports/blank.transport.js')
var BroadcastChannelTransition = require('./transitions/broadcastchannel.transition.js')
var StorageTransition = require('./transitions/storage.transition.js')

module.exports = (function () {
	switch (true) {
		case BroadcastChannelTransition.supported: return BroadcastChannelTransition
		case StorageTransition.supported: return StorageTransition
		default: return BlankTransport
	}
}())