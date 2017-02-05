'use strict'

/**
 * Message entity constructor
 * @param {*} data - any data to be transfered
 * @param {Object} [source] - source sent from
 */
function Message(data, source){
	source = source || {}
	this.data = data
	this.key = source.key
	this.sourceChannel = source.name
}

// Message.prototype.toJSON = function(){
// 	return this
// }
Message.prototype.asJSON = function(){
	return JSON.stringify(this)
}

Message.prototype.toString = Message.prototype.asJSON

// _createEvent = function (event) {
// 	return '__connexionEvent__:' + JSON.stringify(event);
// }

module.exports = Message