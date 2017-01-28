'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')
var generateRandomKey = require('../../utils/generate-random-key.js')
var getAllChildWindows = require('../../utils/get-all-child-windows.js')
var environment = require('../../utils/environment.js')

var global = environment.global
var window = environment.window
var chrome = global.chrome // || global.browser
var detection = chrome && chrome.runtime && chrome.runtime.onMessage

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

"externally_connectable": {
  "matches": ["*://*.example.com/*"]
}
 */

function Transport(name) {
	this.port = chrome.runtime// || chrome.extension
	this.port2 = chrome.tabs
	this.name = name
	this.key = generateRandomKey()
	this.listener = null
}

Transport.supported = Boolean(detection)

Transport.prototype.send = function (data) {
	var message = new Message(data, this)

	//Sending a request from a content script looks like this: 
	// chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
	// 	console.log(response.farewell);
	// });

	//This example demonstrates sending a message to the content script in the selected tab. 
	// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// 	chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	// 		console.log(response.farewell);
	// 	});
	// });

	this.port.sendMessage(message)
	//this.port2 && this.port2.sendMessage(message)
	//this.port.sendMessage(extensionId, message)
}

Transport.prototype.onMessageEvent = function (handler) {
	var transport = this
	//This looks the same from a content script or extension page. 
	// chrome.runtime.onMessage.addListener(
	// 	function (request, sender, sendResponse) {
	// 		console.log(sender.tab ?
	// 			"from a content script:" + sender.tab.url :
	// 			"from the extension");
	// 		if (request.greeting == "hello")
	// 			sendResponse({ farewell: "goodbye" });
	// 	});

	//	Fired when a message is sent from another extension/app (by runtime.sendMessage). Cannot be used in a content script. 

	// chrome.runtime.onMessageExternal.addListener(function (request, sender, sendResponse){})

	//in content
	// this.port.onMessage.addListener(function (message) {
	// 	console.info(message)
	// 	//port.postMessage({ answer: "Madame" })
	// });


	//in extension
	// chrome.runtime.onConnect.addListener(function (port) {
	// 	console.info(port.name)
	// 	port.name === transport.name
	// 	port.onMessage.addListener(function (message) {
	// 		console.info(message)
	// 		//port.postMessage({ question: "Who's there?" })
	// 	})
	// })

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
	this.port.onMessage.addListener(listener)
	//this.port.onMessageExternal.addListener(listener)
	this.listener = listener
}

Transport.prototype.close = function () {
	this.port.onMessage.removeListener(this.listener)
	this.listener = null
}


module.exports = Transport