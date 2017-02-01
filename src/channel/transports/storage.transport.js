'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var environment = require('../../utils/environment.js')

var window = environment.window
var storageSupported = (function(){
	try {return 'localStorage' in global && global.localStorage !== null} 
	catch(e) {return false}
}())

/* Known possible issues:
1. IE dispathes events on a `document`. if ('v'=='\v') 
2. Firefox dispatches event on `body`
3. IE 8 doesn't have `key` and `newValue` properties in an event. if (document.documentMode < 9)
4. In iOS event is not fired between tabs
5. Old Firefox and IE may dispath event on the same context
6. IE 10-11 dispatches event before storage modification and `newValue` is not new but old
7. IE 10-11 work very bad with iframes
8. IE 11 may dispatch event twice in an iframe

Links:
* http://blogs.msdn.com/b/ieinternals/archive/2009/09/16/bugs-in-ie8-support-for-html5-postmessage-sessionstorage-and-localstorage.aspx

A good case https://github.com/nodeca/tabex
*/

function Transport (name){
	this.port1 = global.localStorage // sessionStorage || globalStorage
	this.port2 = window //document || body
	this.listener = null
	this.name = name
	this.key = generateRandomKey()
}

Transport.supported = Boolean(storageSupported)
Transport.STORAGE_KEY = '__cross-channel_message'
Transport.EVENT_TYPE = 'storage'

Transport.prototype = {
	send: function (data) {
		var message = new Message(data, this)
		message.changeTrigger = generateRandomKey()
		var port1 = this.port1
		var port2 = this.port2
		
		setTimeout(function(){ 
			var messageJSON = message.asJSON()
			var storageEvent = new window.StorageEvent(Transport.EVENT_TYPE, {newValue: messageJSON})
			try {
				port1.setItem(Transport.STORAGE_KEY, messageJSON)
			}
			catch(err){
				console.error(err)
			}
			port2.dispatchEvent(storageEvent) 
		}, 0)
	},

	onMessageEvent: function (handler) {
		var transport = this
		var port2 = this.port2
		function listener(event) {
			event.data = event.newValue
			var messageEvent = new MessageEvent(event)
			if (
				('key' in messageEvent) 
				&& ('sourceChannel' in messageEvent)
				&& transport.name === messageEvent.sourceChannel //events on the same channel
				&& transport.key !== messageEvent.key //skip returned back events
			) { 
				handler(messageEvent)
			}
		}
		
		port2.removeEventListener(Transport.EVENT_TYPE, this.listener)
		port2.addEventListener(Transport.EVENT_TYPE, listener)
		this.listener = listener
	},

	close: function () {
		this.port2.removeEventListener(Transport.EVENT_TYPE, this.listener)
		this.listener = null
	}
}

module.exports = Transport