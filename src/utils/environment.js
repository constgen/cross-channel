'use strict'
!function(self, nodeGlobal, browserWindow, undefined) {
	var window = self.window || browserWindow || {}
	var location = window.location || {}
	var global = nodeGlobal || (('top' in window) ? (window.top.global || {}) : {}) //NodeJS `global`
	
	var isNode = ('require' in global) && ('process' in global) && (global.global === global) && (typeof __dirname !== 'undefined') //NodeJS context

	//export
	exports.window = window
	exports.global = global
	exports.location = location
	exports.isNode = isNode
	exports.undefined = undefined
}(this, (typeof global !== 'undefined') ? global : null, (typeof window !== 'undefined') ? window : null)