'use strict';

var CrossChannel = require('../../src/index.js')

var channel

describe('instance', function () {
	beforeEach(function () {
		channel = new CrossChannel('test-index')
	})
	describe('has a correct interface', function () {
		it('"closed" is false by default', function () {
			expect(channel.closed).toBe(false)
		})
		it('"postMessage()" is a function', function () {
			expect(channel.postMessage).toEqual(jasmine.any(Function))
		})
		it('"addEventListener()" is a function', function () {
			expect(channel.addEventListener).toEqual(jasmine.any(Function))
		})
		it('"on()" is a function', function () {
			expect(channel.addEventListener).toEqual(jasmine.any(Function))
		})
		it('"on()" is an alias to the "addEventListener()"', function () {
			expect(channel.on).toBe(channel.addEventListener)
		})
		it('"once()" is a function', function () {
			expect(channel.addEventListener).toEqual(jasmine.any(Function))
		})
		it('"removeEventListener()" is a function', function () {
			expect(channel.addEventListener).toEqual(jasmine.any(Function))
		})
		it('"removeAllListeners()" is a function', function () {
			expect(channel.addEventListener).toEqual(jasmine.any(Function))
		})
		it('"close()" is a function', function () {
			expect(channel.addEventListener).toEqual(jasmine.any(Function))
		})
	})
})
