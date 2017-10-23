'use strict'

/*
Know issues:
1. Please note that on Windows, it is not yet possible to set up a named pipe server in a worker process.
 */

var net = require('net');
var NDJSONReader = require('../../types/ndjson-reader.js')
var environment = require('../../utils/environment.js')
var EventEmitterTransport = require('./eventemitter.transport.js')

var supported = environment.is.node && typeof Promise !== 'undefined'
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
	tcpServer = tcpServer || createServer(PIPE_NAME)
	EventEmitterTransport.call(this, name)
	eventEmitter = eventEmitter || this.port
}

Transport.supported = Boolean(supported)
Transport.EVENT_TYPE = EventEmitterTransport.EVENT_TYPE

Transport.prototype = {
	constructor: Transport,
	send: EventEmitterTransport.prototype.send,
	onMessageEvent: EventEmitterTransport.prototype.onMessageEvent,
	close: EventEmitterTransport.prototype.close
}

module.exports = Transport