'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var environment = require('../../utils/environment.js')

var TAB_ID_KEY = 'tabId'
var global = environment.global
var BroadcastChannel = global.BroadcastChannel;
var storageSupported = (function () {
	try {
		return ('sessionStorage' in global) && global.sessionStorage !== null
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

function Transition(name) {
	this.name = name
	this.key = key
	this.port = new BroadcastChannel(name)
}

Transition.supported = Boolean(BroadcastChannel && storageSupported)
Transition.EVENT_TYPE = 'message'

Transition.prototype.send = function (data) {
	var message = new Message(data, this)
	this.port.postMessage(message)
}

Transition.prototype.onMessageEvent = function (handler) {
	var transition = this
	this.port.addEventListener(Transition.EVENT_TYPE, function (event) {
		var messageEvent = new MessageEvent(event)
		if (
			('key' in messageEvent)
			&& transition.key !== messageEvent.key //skip events from the same tab
			&& ('sourceChannel' in messageEvent)
		) {
			handler(messageEvent)
		}
	})
}

Transition.prototype.close = function () {
	this.port.close()
}

module.exports = Transition