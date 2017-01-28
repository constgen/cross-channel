'use strict'

var CrossChannel = require('../../src/index.js')

var channel1
var channel2
var channelName = 'test-constructor'

describe('constructor', function () {
	it('must always be called with a "new" statement', function () {
		expect(function(){ CrossChannel(channelName) }).toThrowError(TypeError)
	})
	it('throws exception when no argument specified', function(){
		expect(function(){ new CrossChannel() }).toThrowError(TypeError)
	})
	it('produces correct instances', function () {
		channel1 = new CrossChannel(channelName)		
		channel2 = new CrossChannel(channelName)
		expect(channel1).not.toBe(channel2)
		expect(channel1).toEqual(jasmine.any(CrossChannel))
		expect(channel2).toEqual(jasmine.any(CrossChannel))
	})
})