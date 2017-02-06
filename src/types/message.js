'use strict'

var isDOMNode = require('../utils/is-dom-node.js')

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

Message.prototype.asJSON = function(){
	if (isDOMNode(this.data)) {
		throw new DOMException('Failed to execute "postMessage" on "CrossChannel": ' + this.data.constructor.name + ' object could not be cloned.', 'DataCloneError')
	}
	return JSON.stringify(this)
}

Message.prototype.toString = Message.prototype.asJSON

module.exports = Message