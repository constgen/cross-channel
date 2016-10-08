'use strict'

var createNoop = require('../utils/create-noop.js')

function Handler(callback, identifier){
	callback = callback || createNoop()
	if (callback[identifier]) {
		return callback[identifier]
	}
	else {
		callback[identifier] = this
		this.callback = callback
		this.next = undefined
		this.prev = undefined
	}
}

Handler.prototype.call = function (event) {
	var callback = this.callback
	callback(event)
}

module.exports = Handler