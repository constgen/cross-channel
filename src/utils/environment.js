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
	// NWJS context
	var isNW = (
		('process' in global)
		&& (
			('_nw_app' in global.process)
			|| ('__node_webkit' in global.process)
			|| ('__nwjs' in global.process)
			|| ('nw' in global.process.versions)
			|| ('chromium' in global.process.versions)
			|| ('node-webkit' in global.process.versions)
		)
	)

	//export
	exports.window = window
	exports.global = global
	exports.location = location
	exports.is = {
		node: isNode,
		nw: isNW
	}
	exports.undefined = undefined
} (this, (typeof global !== 'undefined') ? global : null, (typeof window !== 'undefined') ? window : null)