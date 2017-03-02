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

function createServer(pipeName){
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
	return new Promise(function(done, failed){
		server.listen(pipeName, done)
		server.on('error', failed)
	}).then(function(){ return server})
}

function connectServer(pipeName){
	return new Promise(function(done, failed){
		var socket = net.connect(pipeName, function(){
			done(socket)
		})
	})
}

function Transport(name) {
	var PIPE_NAME = '\\\\.\\pipe\\' + 'cross-channel-' + name;
	var port = new EventEmitter()
	this.name = name
	//this.port = net.createServer()
	this.port = port

	this.listener = noop
	this.key = generateRandomKey()
	//this.port.setMaxListeners(Infinity)

	function setupSocket (socket) {

		var reader = new NDJSONReader(socket)
		// reader.on('end', socket.removeAllListeners)
		
		reader.on('data', function(data){
			port.emit(Transport.MESSAGE_EVENT_TYPE, data)
		})

		port.on(Transport.SEND_EVENT_TYPE, function(event){
			//console.log(event.data)
			reader.write(event)
		})
	}

	this.whenServerReady = createServer(PIPE_NAME).then(function(server){
		console.log('server '+ name + ' created')
		return server
	}).then(function(server){
		server.on('connection', setupSocket)
	}).catch(function(err){
		if (err.code === 'EADDRINUSE') {
			//console.error(err)
			return connectServer(PIPE_NAME).then(function(socket){
				console.log('socket '+ name + ' connected')
				return socket
			}).then(setupSocket)
		}
		throw err
	})
}

Transport.supported = Boolean(environment.is.node)
Transport.MESSAGE_EVENT_TYPE = 'message'
Transport.SEND_EVENT_TYPE = 'send'

Transport.prototype = {
	constructor: Transport,

	send: function(data){
		var message = new Message(data, this)
		var port = this.port
		var event = {
			data: message
		}
		this.whenServerReady.then(function(){
			port.emit(Transport.SEND_EVENT_TYPE, event)
		})
	},

	onMessageEvent: function(handler){
		var transport = this
		var port = this.port
		function listener(event) {
			
			var messageEvent = new MessageEvent(event)
			if (
				transport.name === messageEvent.sourceChannel //events on the same channel
				&& transport.key !== messageEvent.key //skip returned back events
			) {
				handler(messageEvent)
			}
		}
		this.whenServerReady.then(function(){
			port.removeListener(Transport.MESSAGE_EVENT_TYPE, transport.listener)
			port.on(Transport.MESSAGE_EVENT_TYPE, listener)
			transport.listener = listener
		})
	},

	close: function () {
		var transport = this
		var port = this.port
		this.whenServerReady.then(function(){
			port.removeAllListeners()
			transport.listener = noop
		})
	}
}

module.exports = Transport