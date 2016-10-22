'use strict'

var MessageEvent = require('../../../src/types/message-event.js')
var Message = require('../../../src/types/message.js')

var event
var eventWithObject
var eventWithString
var eventWithNumber
var eventWithNull
var eventWithBoolean
var GlobalMessageEvent
var dataObject
var dataString
var dataNumber
var dataBoolean


describe('Message event', function(){
	beforeEach(function () {
		dataObject = {a: 1}
		dataString = 'data'
		dataNumber = '999'
		dataBoolean = true
		event = new MessageEvent()
		eventWithObject = new MessageEvent({data: new Message(dataObject)})
		eventWithString = new MessageEvent({data: new Message(dataString)})
		eventWithNumber = new MessageEvent({data: new Message(dataNumber)})
		eventWithNull = new MessageEvent({data: new Message(null)})
		eventWithBoolean = new MessageEvent({data: new Message(dataBoolean)})
		GlobalMessageEvent =  window.MessageEvent
	})
	it('is an instance of the default MessageEvent', function(){
		expect(event).toEqual(jasmine.any(GlobalMessageEvent))
	})
	it('has "data"=undefined by default', function(){
		expect(event.data).toEqual(undefined)
	})
	it('has "timestamp"=0 by default', function(){
		expect(event.timeStamp).toEqual(0)
	})
})