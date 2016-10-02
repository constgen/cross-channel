'use strict'

var HandlersCollection = require('../../src/handlerscollection.js')

var eventHandlers
var handler1
var handler2
var handler3
var handler4
var event

describe('HandlersCollection', function(){
	beforeEach(function () {
		eventHandlers = new HandlersCollection()
		handler1 = jasmine.createSpy('handler1')
		handler2 = jasmine.createSpy('handler2')
		handler3 = jasmine.createSpy('handler3')
		handler4 = jasmine.createSpy('handler4')
	})

	it('correctly creates empty collection', function () {
		expect(eventHandlers.head.next).toBe(eventHandlers.tail)
		expect(eventHandlers.tail.prev).toBe(eventHandlers.head)
		
		expect(eventHandlers.head.prev).toBeUndefined()
		expect(eventHandlers.tail.next).toBeUndefined()
	})

	it('can push functions', function () {
		eventHandlers.push(handler1)
		eventHandlers.push(handler2)
		eventHandlers.push(handler3)

		expect(eventHandlers.head.next.callback).toBe(handler1)
		expect(eventHandlers.head.next.next.callback).toBe(handler2)
		expect(eventHandlers.head.next.next.next.callback).toBe(handler3)
		expect(eventHandlers.tail.prev.callback).toBe(handler3)
	})

	xit('handlers can be pushed to multipple collections', function () {
	
	})

	xit('preserves unique functions', function () {
	
	})

	describe('can remove', function(){
		beforeEach(function() {
			eventHandlers.push(handler1)
			eventHandlers.push(handler2)
			eventHandlers.push(handler3)		
			eventHandlers.push(handler4)
		})

		it('from the center', function () {
			eventHandlers.remove(handler2)
			eventHandlers.remove(handler3)

			expect(eventHandlers.head.next.callback).toBe(handler1)
			expect(eventHandlers.head.next.next.callback).toBe(handler4)
			expect(eventHandlers.tail.prev.callback).toBe(handler4)
		})

		it('from the beginning', function () {
			eventHandlers.remove(handler1)

			expect(eventHandlers.head.next.callback).toBe(handler2)
			expect(eventHandlers.head.next.prev).toBe(eventHandlers.head)
			expect(eventHandlers.head.next.next.callback).toBe(handler3)
		})

		it('from the end', function () {
			eventHandlers.remove(handler4)

			expect(eventHandlers.tail.prev.callback).toBe(handler3)
			expect(eventHandlers.tail.prev.next).toBe(eventHandlers.tail)
			expect(eventHandlers.tail.prev.prev.callback).toBe(handler2)
		})

		it('all functions', function () {
			eventHandlers.remove(handler1)
			eventHandlers.remove(handler2)
			eventHandlers.remove(handler3)
			eventHandlers.remove(handler4)

			expect(eventHandlers.head.next).toBe(eventHandlers.tail)
			expect(eventHandlers.tail.prev).toBe(eventHandlers.head)
		})
		
		it('not pushed function and the collection stays the same', function () {
			eventHandlers.remove(function(){})

			expect(eventHandlers.head.next.callback).toBe(handler1)
			expect(eventHandlers.head.next.next.callback).toBe(handler2)
			expect(eventHandlers.head.next.next.next.callback).toBe(handler3)
			expect(eventHandlers.head.next.next.next.next.callback).toBe(handler4)
			expect(eventHandlers.tail.prev.callback).toBe(handler4)
		})
	})

	xdescribe('can empty', function(){
		beforeEach(function() {
			eventHandlers.push(handler1)
			eventHandlers.push(handler2)
			eventHandlers.push(handler3)		
			eventHandlers.push(handler4)
		})
	})

	xdescribe('detects containment', function(){
		beforeEach(function() {
			eventHandlers.push(handler1)
			eventHandlers.push(handler2)
			eventHandlers.push(handler3)		
			eventHandlers.push(handler4)
		})
	})

	describe('can handle event', function(){
		beforeEach(function() {
			eventHandlers.push(handler1)
			eventHandlers.push(handler2)
			eventHandlers.push(handler3)		
			eventHandlers.push(handler4)
			event = {type: 'event'}
		})

		it('successfully', function () {
			eventHandlers.handle()

			expect(handler1).toHaveBeenCalled()
			expect(handler2).toHaveBeenCalled()
			expect(handler3).toHaveBeenCalled()
			expect(handler4).toHaveBeenCalled()
		})

		it('with an argument', function () {
			eventHandlers.handle(event)

			expect(handler1).toHaveBeenCalledWith(event)
			expect(handler2).toHaveBeenCalledWith(event)
			expect(handler3).toHaveBeenCalledWith(event)
			expect(handler4).toHaveBeenCalledWith(event)
		})

		xit('with a correct context', function () {
			eventHandlers.handle()

			expect(handler1.calls.mostRecent().object).toBe(undefined)
			expect(handler2.calls.mostRecent().object).toBe(undefined)
			expect(handler3.calls.mostRecent().object).toBe(undefined)
			expect(handler4.calls.mostRecent().object).toBe(undefined)
		})
	})
})