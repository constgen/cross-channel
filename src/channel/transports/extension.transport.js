'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var environment = require('../../utils/environment.js')
var noop = require('../../utils/noop.js')

var global = environment.global
var chrome = global.chrome
var extension = (typeof browser === 'object') && browser
var runtime = extension && extension.runtime || chrome && (chrome.runtime || chrome.extension)
var tabs = extension && extension.tabs || chrome && chrome.tabs;
var detection = runtime && runtime.onMessage;

/*
Reference:
https://developer.chrome.com/extensions/messaging
http://www.adambarth.com/experimental/crx/docs/messaging.html (Chrome <=19 )
https://developer.chrome.com/extensions/content_scripts#host-page-communication
http://stackoverflow.com/questions/10526995/can-a-site-invoke-a-browser-extension

If you need to support Chrome 19 and earlier, use chrome.extention.onRequest and chrome.extention.sendRequest
For Chrome 20 - 25, use chrome.extension.onMessage and chrome.extension.sendMessage
For Chrome 26+ use chrome.runtime.onMessage and chrome.runtime.sendMessage

Getting manifest config
chrome.runtime.getManifest()

 */

function Transport(name) {
	this.port = runtime
	this.tabs = tabs
	this.name = name
	this.key = generateRandomKey()
	this.listener = noop
}

Transport.supported = Boolean(detection)

Transport.prototype = {
	constructor: Transport,

	send: function (data) {
		var message = new Message(data, this)
		var transport = this
		this.port.sendMessage(message)
		if (this.tabs) {
			this.tabs.query({}, function (tabs) {
				var i = -1
				while (++i in tabs) {
					transport.tabs.sendMessage(tabs[i].id, message, function () {
						var err = runtime.lastError
					})
				}
			})
		}
		//this.port.sendMessage(extensionId, message)
	},

	onMessageEvent: function (handler) {
		var transport = this
		//	Fired when a message is sent from another extension/app (by runtime.sendMessage). Cannot be used in a content script. 
		// chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse){})
		function listener(message, sender) {
			var messageEvent = new MessageEvent({
				data: message,
				origin: sender.tab ? sender.tab.url : sender.url
			})
			if (
				('sourceChannel' in messageEvent)
				&& ('key' in messageEvent)
				&& transport.name === messageEvent.sourceChannel //events on the same channel
				&& transport.key !== messageEvent.key //skip returned back events
			) {
				handler(messageEvent)
			}
		}
		this.port.onMessage.removeListener(this.listener)
		//this.port.onMessageExternal.removeListener(this.listener)
		this.port.onMessage.addListener(listener)
		//this.port.onMessageExternal.addListener(listener)
		this.listener = listener
	},

	close: function () {
		this.port.onMessage.removeListener(this.listener)
		//this.port.onMessageExternal.removeListener(this.listener)
		this.listener = noop
	}
}

module.exports = Transport