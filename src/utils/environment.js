'use strict'
!function (self, nodeGlobal, browserWindow, undefined) {
	var window = self.window || browserWindow || {}
	var location = window.location || {}
	var global = nodeGlobal || (('top' in window) ? (window.top.global || {}) : {}) //NodeJS `global`
	//NodeJS context
	var isNode = (			
		('process' in global)		
		&& (global.global === global)		
		&& (typeof __dirname !== 'undefined')	
	)
	// Node-webkit context
	var isNodeWebkit = (
		('process' in global)
		&& (
			('_nw_app' in global.process)
			|| ('__node_webkit' in global.process)
			|| ('node-webkit' in global.process.versions)
		)
	)
	// NWJS context
	var isNW = (
		('process' in global)
		&& (
			('__nwjs' in global.process)
			|| ('nw' in global.process.versions)
		)
	)

	// var isExtension = (function(){
	// 	try {
	// 		return Boolean(window.top && window.top.location.protocol === 'chrome-extension:')
	// 	}
	// 	catch(err) {
	// 		return false
	// 	}
	// }())

	//export
	exports.window = window
	exports.global = global
	exports.location = location
	exports.is = {
		node: isNode,
		nw: isNW,
		nodeWebkit: isNodeWebkit
		//extension: isExtension
	}
	exports.undefined = undefined
} (this, (typeof global !== 'undefined') ? global : null, (typeof window !== 'undefined') ? window : null)