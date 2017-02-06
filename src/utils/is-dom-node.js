'use strict'

var noop = require('../utils/noop.js')

var DOMConstructor = (typeof Node === 'function') ? Node : noop;

module.exports = function(element){
	return element instanceof DOMConstructor
}