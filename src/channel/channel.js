'use strict'

var PostMessageTransport = require('./postmessage.transport.js')
var NwTransport = require('./nw.transport.js')
var BlankTransport = require('./blank.transport.js')

var Transport

if (NwTransport.supported) {
	Transport = NwTransport
}
else if (PostMessageTransport.supported) {
	Transport = PostMessageTransport
}
else {
	Transport = BlankTransport
}
//Transport = require('./experimental/broadcastchannel.transport.js')
//Transport = require('./experimental/storage.transport.js')
//Transport = require('./experimental/eventemitter.transport.js')

function Channel(id) {
	Transport.call(this, id)
}

Channel.prototype = Object.create(Transport.prototype)
Channel.prototype.constructor = Channel

module.exports = Channel




