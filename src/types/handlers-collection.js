'use strict'

var Symbol = require('es6-symbol')
var Handler = require('./handler.js')

function HandlersCollection () {
	this.head = new Handler()
	this.tail = new Handler()
	this.head.next = this.tail
	this.tail.prev = this.head
	this.identifier = Symbol()
}

HandlersCollection.prototype = {
	constructor: HandlersCollection,

	handle: function (event) {
		var handler = this.head.next
		while (handler) {
			handler.call(event)
			handler = handler.next
		}
	},

	push: function (callback) {
		var handler = new Handler(callback, this.identifier)
		var last = this.tail.prev
		if (handler.next) { //is already in collection
			return
		}
		handler.next = this.tail
		this.tail.prev = handler
		handler.prev = last
		last.next = handler
	},

	remove: function (callback) {
		var handler = new Handler(callback, this.identifier)
		var prev = handler.prev
		var next = handler.next
		if (prev) {
			prev.next = next
		}
		if (next) {
			next.prev = prev
		}
	},

	empty: function () {
		this.head.next = this.tail
		this.tail.prev = this.head
	}
}

module.exports = HandlersCollection
