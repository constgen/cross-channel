'use strict'

function Channel (id){
	this.transport = new BroadcastChannel(id)
}

Channel.prototype.onRecieve = function(handler){
	this.transport.addEventListener('message', handler)
}

Channel.prototype.send = function(message){
	this.transport.postMessage(message)
}

Channel.prototype.onError = function(handler){
	
}

Channel.prototype.close = function(){
	this.transport.close()
}


module.exports = Channel




