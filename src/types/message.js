'use strict'

function Message(data, key){
	this.data = data
	this.key = key
}

// Message.prototype.toJSON = function(){
// 	return this
// }
Message.prototype.asJSON = function(){
	return JSON.stringify(this)
}

// _createEvent = function (event) {
// 	return '__connexionEvent__:' + JSON.stringify(event);
// }

module.exports = Message