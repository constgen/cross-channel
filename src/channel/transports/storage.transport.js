'use strict'

/* Known possible issues:
1. IE dispathes events on a `document`. if ('v'=='\v') 
2. Firefox dispatches event on `body`
3. IE 8 doesn't have `key` and `newValue` properties in an event. if (document.documentMode < 9)
4. In iOS event is not fired between tabs
5. IE 10-11 dispatches event before storage modification and `newValue` is not new but old
6. IE 10-11 doesn't dispatch event in frames of the second tab

Links:
* http://blogs.msdn.com/b/ieinternals/archive/2009/09/16/bugs-in-ie8-support-for-html5-postmessage-sessionstorage-and-localstorage.aspx
*/

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var environment = require('../../utils/environment.js')
var locationOrigin = require('../../services/location.js').origin
var getOriginWindows = require('../../utils/frames.js').getSameOrigin

var global = environment.global
var window = environment.window
var navigator = window.navigator
var document = window.document
var storageSupported = (function () {
	try { return 'localStorage' in global && global.localStorage !== null }
	catch (e) { return false }
}())
var URL = (typeof window.URL === 'function') && window.URL
var StorageEvent = window.StorageEvent || {}
var edgeBrowser = navigator && ('msSaveBlob' in navigator) && document && !('documentMode' in document) // && 'StyleMedia' in window

//IE and Edge fix, Opera <=12 fix
if (storageSupported && (typeof StorageEvent === 'object' || StorageEvent.length === 0)) {
	StorageEvent = function (eventType, params) {
		params = params || {}
		var event = document.createEvent('Event')
		event.initEvent('storage', false, false)
		event.key = params.key || ''
		event.oldValue = params.oldValue || ''
		event.newValue = params.newValue || ''
		event.url = params.url || ''
		event.storageArea = params.storageArea || null
		return event;
	}
	StorageEvent.prototype = window.Event.prototype;
}

function Transport(name) {
	this.port1 = global.localStorage // sessionStorage || globalStorage
	this.port2 = window //document || body
	this.listener = null
	this.name = name
	this.key = generateRandomKey()
	this.latestEventData = undefined
}

Transport.supported = Boolean(storageSupported)
Transport.STORAGE_KEY = '__cross-channel_message'
Transport.EVENT_TYPE = 'storage'

Transport.prototype = {
	constructor: Transport,

	send: function (data) {
		var message = new Message(data, this)
		var port1 = this.port1
		var port2 = this.port2
		var messageJSON
		var windows
		var index

		message.changeTrigger = generateRandomKey()
		messageJSON = message.asJSON()
		setTimeout(function () {
			var storageEvent = new StorageEvent(Transport.EVENT_TYPE, { newValue: messageJSON })
			try {
				port1.setItem(Transport.STORAGE_KEY, messageJSON)
			}
			catch (err) {
				console.error(err)
			}

			if (edgeBrowser) { // fix: Edge doesn't dispatch event in frames of the current window
				windows = getOriginWindows(port2.top)
				index = -1
				while (++index in windows) {
					windows[index].dispatchEvent(storageEvent)
				}
			}
			else {
				port2.dispatchEvent(storageEvent)
			}
		}, 0)
	},

	onMessageEvent: function (handler) {
		var transport = this
		var port2 = this.port2
		function listener(event) {
			event.data = event.newValue
			event.origin = URL && event.url && new URL(event.url).origin || locationOrigin //fix for some specific issues when 'storage' event is dispached across origins
			var messageEvent = new MessageEvent(event)

			if (
				('key' in messageEvent)
				&& ('sourceChannel' in messageEvent)
				&& transport.name === messageEvent.sourceChannel // events on the same channel
				&& transport.key !== messageEvent.key // skip returned back events
				&& transport.latestEventData !== event.data
				&& event.origin === locationOrigin
			) {
				transport.latestEventData = event.data // fix: previous IE handles event twice
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
		this.latestEventData = undefined
	}
}

module.exports = Transport