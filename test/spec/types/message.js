'use strict'

var Message = require('../../../src/types/message.js')

var message1
var message2
var data
var source


describe('Message instance', function () {
	beforeEach(function () {
		data = { a: 1 }
		source = {
			key: 111,
			name: '222'
		}
		message1 = new Message(data, source)
		message2 = new Message()
	})
	describe('has properties', function () {
		it('data', function () {
			expect(message1.data).toEqual(data)
			expect(message2.data).toBe(undefined)
		})
		it('key', function () {
			expect(message1.key).toEqual(source.key)
			expect(message2.key).toBe(undefined)
		})
		it('sourceChannel', function () {
			expect(message1.sourceChannel).toEqual(source.name)
			expect(message2.sourceChannel).toBe(undefined)
		})
	})
	it('can be serialized to JSON', function () {
		var messageJson = message1.asJSON()
		var message = JSON.parse(messageJson)
		expect(message).toEqual({
			data: data, 
			key: source.key, 
			sourceChannel: source.name
		})
	})
})