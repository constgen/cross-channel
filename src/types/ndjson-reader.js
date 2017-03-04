'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter;

function dataHandler(reader){
	return function(data) {
		reader.push(data)
	}
}
function endHandler(type, eventHandler){
	return function() {
		this.removeListener(type, eventHandler)
	}
}

/**
 * Creates a new stream that continiusly reads the data and incrementally parses messages.
 * @param {Object} stream - A readable-writable stream.
 * @constructor
 */
function NDJSONReader(stream) {
	EventEmitter.call(this)
	this.stream = stream
	this.sequence = ''
	var pushData = dataHandler(this)
	stream.on('data', pushData)
	stream.on('end', endHandler('data', pushData))
	stream.on('close', endHandler('data', pushData))
}
util.inherits(NDJSONReader, EventEmitter)
/**
 * @static {String} - A devider symbol in the data string.
 */
NDJSONReader.MESSAGE_DEVIDER = /\n|\r\n/g

/**
 * Collects a new data.
 * @param {String} chunk - Data.
 */
NDJSONReader.prototype.push = function (chunk) {
	chunk = String(chunk);
	this.sequence += chunk;
	this.read();
}
/**
 * Parses collected data.
 */
NDJSONReader.prototype.read = function () {
	var messages
	var reader = this
	messages = this.sequence.split(NDJSONReader.MESSAGE_DEVIDER);
	//remove tail of the masseges and keep it in the sequence
	this.sequence = messages.splice(-1).toString();

	messages
		.filter(function (data) {
			return data;
		})
		.map(function (data) {
			try {
				return JSON.parse(data)
			}
			catch (err) {
				reader.emit('error', new Error('Could not parse row ' + data))
			}
		})
		.forEach(function(data){
			reader.emit('data', data)
		})
}
/**
 * Writes data to a stream.
 * @param {String} chunk - Data.
 */
NDJSONReader.prototype.write = function (chunk) {
	chunk = JSON.stringify(chunk) + '\n'
	this.stream.write(chunk)
}

module.exports = NDJSONReader;
