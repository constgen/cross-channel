'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var environment = require('../../utils/environment.js')

var TAB_ID_KEY = 'tabId'
var window = environment.window
var storageSupported = (function () {
	try {
		return ('localStorage' in global)
			&& ('sessionStorage' in global)
			&& global.localStorage !== null
			&& global.sessionStorage !== null
	}
	catch (err) { return false }
} ())

var key = (function () {
	if (!storageSupported) return
	var tabId = global.sessionStorage.getItem(TAB_ID_KEY)
	if (!tabId) {
		tabId = generateRandomKey()
		global.sessionStorage.setItem(TAB_ID_KEY, tabId)
	}
	return tabId
} ())

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


function Transition(name) {
	this.port1 = global.localStorage
	this.port2 = window //document || body
	// this.port3 = global.sessionStorage
	this.listener = null
	this.name = name
	this.STORAGE_KEY = '__cross-channel_message_' + name
	this.key = key
}

Transition.supported = Boolean(storageSupported)
Transition.EVENT_TYPE = 'storage'

Transition.prototype.send = function (data) {
	var transition = this
	var port1 = this.port1
	// var port3 = this.port3
	var message = new Message(data, this)
	message.changeTrigger = generateRandomKey()
	var messageJSON = message.asJSON()
	setTimeout(function () {
		try {
			// port3.setItem(transition.STORAGE_KEY, messageJSON)
			port1.setItem(transition.STORAGE_KEY, messageJSON)
		}
		catch (err) {
			console.error(err)
		}
	}, 0)
}

Transition.prototype.onMessageEvent = function (handler) {
	var transition = this
	var port1 = this.port1
	var port2 = this.port2
	// var port3 = this.port3
	function listener(event) {
		var storageData = event.newValue
		var messageEvent
		if (
			event.storageArea !== port1 //consider only localStorage events
			//|| port3.getItem(transition.STORAGE_KEY) === storageData
		) {
			return
		}
		
		// port3.setItem(transition.STORAGE_KEY, storageData)
		event.data = storageData
		messageEvent = new MessageEvent(event)
		if (
			('key' in messageEvent)
			&& ('sourceChannel' in messageEvent)
			&& transition.name === messageEvent.sourceChannel //events on the same channel
			&& transition.key !== messageEvent.key //skip events from the same tab
		) {
			handler(messageEvent)
		}
	}

	port2.removeEventListener(Transition.EVENT_TYPE, this.listener)
	port2.addEventListener(Transition.EVENT_TYPE, listener)
	this.listener = listener
}

Transition.prototype.close = function () {
	this.port2.removeEventListener(Transition.EVENT_TYPE, this.listener)
	this.listener = null
}

module.exports = Transition