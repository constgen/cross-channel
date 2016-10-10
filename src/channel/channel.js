'use strict'

var environment = require('../utils/environment.js')

var Transport

//Transport = require('./broadcastchannel.transport.js')
if (environment.isNode) {
	Transport = require('./nw.transport.js')
}
else {
	Transport = require('./postmessage.transport.js')
}

function Channel (id){
	Transport.call(this, id)
}

Channel.prototype = Object.create(Transport.prototype)
Channel.prototype.constructor = Channel


module.exports = Channel




