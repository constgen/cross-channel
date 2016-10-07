'use strict'

//var Transport = require('./broadcastchannel.transport.js')
var Transport = require('./postmessage.transport.js')


function Channel (id){
	Transport.call(this, id)
}

Channel.prototype = Object.create(Transport.prototype)
Channel.prototype.constructor = Channel


module.exports = Channel




