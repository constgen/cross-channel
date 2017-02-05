'use strict'

var environment = require('./environment.js')

var location = environment.location

module.exports = location.origin || (location.protocol + '//' + location.host)