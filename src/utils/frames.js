'use strict'

var environment = require('./environment.js')

module.exports = {
	isSameOrigin: function (win, currentWin) {
		try {
			if (win.location.origin) {
				if (environment.is.nw) {
					return true //workaround for NWJS app when external origin have full privileges
				}
				else {
					return win.location.origin === currentWin.location.origin
				}
			}
			else {
				return win.location.host === currentWin.location.host && win.location.protocol === currentWin.location.protocol
			}
		}
		catch(err){
			return false
		}
	},

	getCrossOriginChildren: function getCrossOriginChildren(topWin) {
		var crossOriginFrames = []
		var frames = topWin.frames
		var currentWin = environment.global.window
		var win
		var i = frames.length
		var isSameOrigin = module.exports.isSameOrigin

		while (i--) {
			win = frames[i]
			if (!isSameOrigin(win, currentWin)) {
				crossOriginFrames.push(win)
			}
			//include deeper level frames
			crossOriginFrames = crossOriginFrames.concat(getCrossOriginChildren(win))
		}

		return crossOriginFrames
	},

	getSameOriginChildren: function getSameOriginChildren(topWin) {
		var sameOriginFrames = []
		var frames = topWin.frames
		var currentWin = environment.global.window
		var win
		var i = frames.length
		var isSameOrigin = module.exports.isSameOrigin

		while (i--) {
			win = frames[i]
			if (isSameOrigin(win, currentWin)) {
				sameOriginFrames.push(win)
			}
			//include deeper level frames
			sameOriginFrames = sameOriginFrames.concat(getSameOriginChildren(win))
		}

		return sameOriginFrames
	},

	/**
	 * Returns a collection of all child frames/iframes windows objects. Takes into a count deeper nested frames.
	 * @param [Window] topWin - Main document window, where to search child frames
	 * @returns [Array] - Array of all child windows.
	 */
	getAllChildren: function getAllChildren(topWin) {
		var childFrames = []
		var frames = topWin.frames
		var win
		var i = frames.length

		while (i--) {
			win = frames[i]
			childFrames.push(win)
			//include deeper level frames
			childFrames = childFrames.concat(getAllChildren(win))
		}

		return childFrames
	},

	/**
	 * Returns a collection of cross origin frames/iframes windows objects. Takes into a count deeper nested frames.
	 * @param [Window] topWin - Main document window, where to search child frames
	 * @returns [Array] - Array of same origin windows.
	 */
	getSameOrigin: function (topWin) {
		var getSameOriginChildren = module.exports.getSameOriginChildren
		var isSameOrigin = module.exports.isSameOrigin
		var windows = getSameOriginChildren(topWin)
		var currentWin = environment.global.window
		if (isSameOrigin(topWin, currentWin)) {
			windows.push(topWin)
		}
		return windows
	},

	/**
	 * Returns a collection of cross origin frames/iframes windows objects. Takes into a count deeper nested frames.
	 * @param [Window] topWin - Main document window, where to search child frames
	 * @returns [Array] - Array of cross origin child windows.
	 */
	getCrossOrigin: function (topWin) {
		var getCrossOriginChildren = module.exports.getCrossOriginChildren
		var isSameOrigin = module.exports.isSameOrigin
		var windows = getCrossOriginChildren(topWin)
		var currentWin = environment.global.window
		if (!isSameOrigin(topWin, currentWin)) {
			windows.push(topWin)
		}
		return windows
	},

	getAll: function(topWin){
		if (!topWin) { return [] }
		var children = module.exports.getAllChildren(topWin)
		var windows = [topWin].concat(children)
		return windows
	}
}