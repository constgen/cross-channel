'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')

// old fashion
var ipc = require('ipc')
// In main process.
var ipcMain = require('electron').ipcMain
// In renderer process.
var ipcRenderer = require('electron').ipcRenderer

/*
Reference: 
a. https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
b. https://github.com/electron/electron/blob/master/docs/api/web-contents.md

Godd to know about: https://github.com/seanchas116/electron-safe-ipc
 */

function Transport (name){
	this.port1 = ipcMain || ipcRenderer
	//this.port2
	this.name = name
}

Transport.supported = Boolean(false)
Transport.EVENT_TYPE = 'cross-channel-message'

Transport.prototype.send = function(data){
	var message = new Message(data)
	this.port.send(Transport.EVENT_TYPE, message)

	//ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])
	//Like ipcRenderer.send but the event will be sent to the <webview> element in the host page instead of the main process.
}

Transport.prototype.onMessageEvent = function(handler){
	this.port.on(Transport.EVENT_TYPE, function (event, message) {
		//event.sender.send('asynchronous-reply', 'pong')
		//var messageEvent = new MessageEvent(event)
		handler(message)
	})
}

Transport.prototype.close = function(){
	this.port.removeAllListeners()
}


module.exports = Transport