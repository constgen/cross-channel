'use strict'

var environment = require('../../../src/utils/environment.js')

describe('environment', function () {
	if (typeof window !== undefined) {
		it('is not "Node"', function () {
			expect(environment.is.node).toBe(false)
		})
		it('"global" is "window"', function () {
			expect(environment.window).toBe(environment.global)
		})
		it('has correct "location"', function () {
			expect(environment.location).toEqual(jasmine.any(Object))
		})
	}

	it('has correct "undefined"', function () {
		expect(environment.undefined).toBe(undefined)
	})
})