'use strict'

var environment = require('./environment.js')

var window = environment.window
var location = window.location

module.exports =  new String(location.origin || (location.protocol + '//' + location.host))