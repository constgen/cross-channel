'use strict'

function Handler(callback, identifier){
	callback = callback || new Function()
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
	var next = this.next
	callback(event)
	next && next.call(event)
}

module.exports = Handler