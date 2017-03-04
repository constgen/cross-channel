'use strict'

/*
Know issues:
1. Please note that on Windows, it is not yet possible to set up a named pipe server in a worker process.
 */

var net = require('net');
var EventEmitter = require('events')
var noop = require('../../utils/noop.js')
var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var environment = require('../../utils/environment.js')
var NDJSONReader = require('../../types/ndjson-reader.js')

var eventEmitter
var tcpServer

function connectServer(pipeName) {
	return new Promise(function (done, failed) {
		var socket = net.connect(pipeName, function () {
			done(socket)
		})
		//socket.on('close')
	})
}

function setupSocket(socket) {
	var reader = new NDJSONReader(socket)
	// reader.on('end', socket.removeAllListeners)

	reader.on('data', function (event) {
		event.source = eventEmitter
		eventEmitter.emit(Transport.EVENT_TYPE, event)
	})

	eventEmitter.on(Transport.EVENT_TYPE, function (event) {
		var source = event.source
		if (source === eventEmitter) { return }
		event.source = undefined
		reader.write(event)
		event.source = source
	})
}

function createServer(pipeName) {
	var server = net.createServer()
	//server.maxConnections = 

	//server.on('error', server.removeAllListeners)
	// process.on('SIGINT', function () {
	// 	server.close()
	// })

	// process.on('SIGTERM', function () {
	// 	server.close(function () {
	// 		process.exit(0)
	// 	})
	// })
	return new Promise(function (done, failed) {
		server.listen(pipeName, done)
		server.on('error', failed)
	}).then(function () {
		console.log('server ' + pipeName + ' created')
		server.on('connection', setupSocket)
		return server
	}).catch(function (err) {
		if (err.code === 'EADDRINUSE') {
			return connectServer(pipeName).then(function (result) {
				console.log('socket ' + pipeName + ' connected')
				return result
			}).then(setupSocket)
		}
		throw err
	}).catch(function (err) {
		throw err
	})
}

function Transport(name) {
	var PIPE_NAME = '\\\\.\\pipe\\' + 'cross-channel-' + name;
	eventEmitter = eventEmitter || new EventEmitter()
	eventEmitter.setMaxListeners(Infinity)
	tcpServer = tcpServer || createServer(PIPE_NAME)
	this.name = name
	this.port = eventEmitter
	this.listener = noop
	this.key = generateRandomKey()
}

Transport.supported = Boolean(environment.is.node)
Transport.EVENT_TYPE = 'message'

Transport.prototype = {
	constructor: Transport,

	send: function (data) {
		var message = new Message(data, this)
		var event = {
			data: message
		}
		this.port.emit(Transport.EVENT_TYPE, event)
	},

	onMessageEvent: function (handler) {
		var transport = this
		function listener(event) {
			var messageEvent = new MessageEvent(event)
			if (
				transport.name === messageEvent.sourceChannel //events on the same channel
				&& transport.key !== messageEvent.key //skip returned back events
			) {
				handler(messageEvent)
			}
		}
		this.port.removeListener(Transport.EVENT_TYPE, transport.listener)
		this.port.on(Transport.EVENT_TYPE, listener)
		transport.listener = listener
	},

	close: function () {
		this.port.removeListener(Transport.EVENT_TYPE, this.listener)
		this.listener = noop
	}
}

module.exports = Transport