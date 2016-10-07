'use strict'
/**
 * Creates a collection of all child frames/iframes windows objects. Takes into a count deeper nested frames.
 * @param [Window] topWin - Main document window, where to search child frames
 * @returns [Array] - Array of all child windows.
 */
module.exports = function getAllChildWindows (topWin) {
	var windows = []
	var frames = topWin.frames
	var win
	var i = frames.length

	while (i--) {
		win = frames[i]
		windows.push(win)
		//include deeper level frames
		windows = windows.concat(getAllChildWindows(win))
	}

	return windows
}