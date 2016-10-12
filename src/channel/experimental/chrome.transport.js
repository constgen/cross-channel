'use strict'

var MessageEvent = require('../../types/message-event.js')
var Message = require('../../types/message.js')

/*
Reference:
https://developer.chrome.com/extensions/messaging
 */

//Here is how you open a channel from a content script, and send and listen for messages: 


//Sending a request from the extension to a content script looks very similar, except that you need to specify which tab to connect to. Simply replace the call to connect in the above example with tabs.connect. 


function Transport(name) {
	this.port = chrome.runtime.connect(name) //from content
	//this.port = chrome.tabs.connect(name) //from extension
	//this.port2
	this.name = name
}

Transport.supported = Boolean(chrome)

Transport.prototype.send = function (data) {
	var message = new Message(data)

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

	this.port.postMessage(message)
}

Transport.prototype.onMessageEvent = function (handler) {
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
	// this.port2.onmessage = function (event) {
	// 	var messageEvent = new MessageEvent(event)
	// 	handler(messageEvent)
	// }

	//in content
	port.onMessage.addListener(function (message) {
		//port.postMessage({ answer: "Madame" })
	});

	//in extension
	chrome.runtime.onConnect.addListener(function (port) {
		port.name === transport.name;
		port.onMessage.addListener(function (message) {
			//port.postMessage({ question: "Who's there?" })
		});
	});
}

Transport.prototype.close = function () {
	this.port.disconnect()
}


module.exports = Transport