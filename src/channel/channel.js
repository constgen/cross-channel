'use strict'

var environment = require('../utils/environment.js')

var Transport

if (environment.isNode) {
	Transport = require('./nw.transport.js')
}
else {
	Transport = require('./postmessage.transport.js')
}
//Transport = require('./experimental/broadcastchannel.transport.js')
//Transport = require('./experimental/storage.transport.js')

function Channel (id){
	Transport.call(this, id)
}

Channel.prototype = Object.create(Transport.prototype)
Channel.prototype.constructor = Channel


module.exports = Channel




