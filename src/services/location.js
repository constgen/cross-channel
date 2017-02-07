'use strict'

var environment = require('../utils/environment.js')

var global = environment.global

module.exports = {
	get origin (){
		var window = global.window
		var location = window && window.location
		var origin = location && (location.origin || (location.protocol + '//' + location.host))
		return origin
	},
	set origin(value){}
}