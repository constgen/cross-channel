'use strict'

function getChildWindows (topWin) {
	var windows = []
	var frames = topWin.frames
	var win
	var i = frames.length

	while (i--) {
		win = frames[i]
		//if (win.location.origin !== location.origin) {
		if (
			win.location.host !== location.host
			|| win.location.protocol !== location.protocol
		) {
			windows.push(win)
		}
		//include deeper level frames
		windows = windows.concat(getChildWindows(win))
	}

	return windows
}

/**
 * Creates a collection of cross origin frames/iframes windows objects. Takes into a count deeper nested frames.
 * @param [Window] topWin - Main document window, where to search child frames
 * @returns [Array] - Array of all child windows.
 */
module.exports = function(topWin){
	var windows = getChildWindows(topWin)
	if (
			topWin.location.host !== location.host
			|| topWin.location.protocol !== location.protocol
	) {
		windows.push(topWin)
	}
	return windows
}

