'use strict'

//var Symbol = require('es6-symbol')
var Handler = require('./handler.js')

function HandlersCollection () {
	this.head = new Handler()
	this.tail = new Handler()
	this.head.next = this.tail
	this.tail.prev = this.head
	this.identifier = Symbol()
}

HandlersCollection.prototype.handle = function(event){
	var handler = this.head.next
	while (handler) {
		handler.call(event)
		handler = handler.next
	}
	//handler.call(event)
}

HandlersCollection.prototype.push = function(callback){
	var handler = new Handler(callback, this.identifier)
	var last = this.tail.prev

	if (handler.next) { //is already in collection
		return
	}
	handler.next = this.tail
	this.tail.prev = handler
	handler.prev = last
	last.next = handler
}

HandlersCollection.prototype.remove = function(callback){
	var handler = new Handler(callback, this.identifier)
	var prev = handler.prev
	var next = handler.next	

	if (prev) {
		prev.next = next
	}
	if (next) {
		next.prev = prev
	}
}

HandlersCollection.prototype.empty = function(callback){
	this.head.next = this.tail
	this.tail.prev = this.head
}

module.exports = HandlersCollection
