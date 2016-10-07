'use strict'

var CrossChannel = require('../../src/index.js')

var channel1
var channel2
var messageString = 'test message'
var messageObject = {message: 'test'}
var handler1
var handler2
var TIMEOUT

function delay(callback){
	return setTimeout(callback, TIMEOUT)
}

describe('instance', function () {
	var index = 0
	var name 
	beforeEach(function () {
		name = 'channel' + index
		channel1 = new CrossChannel(name)		
		channel2 = new CrossChannel(name)
		spyOn(channel1, 'postMessage').and.callThrough()
		spyOn(channel2, 'postMessage').and.callThrough()
		handler1 = jasmine.createSpy('handler1')
		handler2 = jasmine.createSpy('handler2')
		TIMEOUT = 10
	})
	afterEach(function(){
		index += 1
	})
	it('can listen "message" event asynchronously', function (done) {
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageString)

		expect(handler1).not.toHaveBeenCalled()
		delay(function(){
			expect(handler1).toHaveBeenCalled()
			done()
		})
	})
	it('doesn\'t listen "message" event on the same channel', function (done) {
		channel1.addEventListener('message', handler1)
		channel1.postMessage(messageString)

		delay(function(){
			expect(handler1).not.toHaveBeenCalled()
			done()
		})
	})
	it('ignores multiple attachments of the same handler', function (done) {
		channel1.addEventListener('message', handler1)			
		channel1.addEventListener('message', handler1)			
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageString)

		delay(function(){
			expect(handler1.calls.count()).toEqual(1)
			done()
		})
	})
	it('can be closed', function (done) {
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageString)
		channel1.close()
		channel1.addEventListener('message', handler2)
		channel2.postMessage(messageString)

		delay(function(){
			expect(channel1.closed).toBe(true)
			expect(handler1).not.toHaveBeenCalled()
			expect(handler2).not.toHaveBeenCalled()
			done()
		})
	})
	it('can send string messages', function (done) {
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageString)
		
		delay(function(){
			var eventData = handler1.calls.mostRecent().args[0].data
			expect(eventData).toEqual(messageString)
			done()
		})
	})
	it('can send object messages', function (done) {
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageObject)

		delay(function(){
			var eventData = handler1.calls.mostRecent().args[0].data
			expect(eventData).not.toBe(messageObject)
			expect(eventData).toEqual(messageObject)
			done()
		})
	})
	it('can unsubscribe a listener', function (done) {
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageString)
		channel1.addEventListener('message', handler2)
		channel1.removeEventListener('message', handler1)
		channel1.removeEventListener('message', handler2)
		channel2.postMessage(messageString)

		delay(function(){
			expect(handler1).not.toHaveBeenCalled()
			expect(handler2).not.toHaveBeenCalled()
			done()
		})
	})
	it('can unsubscribe all listeners', function (done) {
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageString)
		channel1.addEventListener('message', handler2)
		channel1.removeAllListeners('message')
		channel2.postMessage(messageString)

		delay(function(){
			expect(handler1).not.toHaveBeenCalled()
			expect(handler2).not.toHaveBeenCalled()
			done()
		})
	})
	it('can unsubscribe all listeners for the same handler', function (done) {
		channel1.addEventListener('message', handler1)			
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageString)
		channel1.addEventListener('message', handler2)			
		channel1.addEventListener('message', handler2)
		channel1.removeEventListener('message', handler1)
		channel1.removeEventListener('message', handler2)
		channel2.postMessage(messageString)

		delay(function(){
			expect(handler1).not.toHaveBeenCalled()
			expect(handler2).not.toHaveBeenCalled()
			done()
		})
	})
	it('can listen "message" event once', function (done) {
		channel1.once('message', handler1)
		channel2.postMessage(messageObject)
		channel2.postMessage(messageObject)
		channel2.postMessage(messageObject)

		delay(function(){
			expect(handler1.calls.count()).toEqual(1)
			done()
		})
	})
	it('can listen "message" event with "onmessage"', function (done) {
		channel1.onmessage = handler1
		channel2.postMessage(messageObject)

		delay(function(){
			expect(handler1).toHaveBeenCalled()
			done()
		})
	})

	xit('handler is called with a correct context', function (done) {
		channel1.addEventListener('message', handler1)
		channel2.postMessage(messageString)

		delay(function(){
			expect(handler1.calls.mostRecent().object).toBe(channel1);
			done()
		})
	})

	it('throws a "TypeError" exception when no message passed', function (done) {
		channel1.addEventListener('message', handler1)
		
		expect(function() {	channel2.postMessage() }).toThrowError(TypeError)
		delay(function(){
			expect(handler1).not.toHaveBeenCalled()
			done()
		})
	})

})

