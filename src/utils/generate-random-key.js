'use strict'

module.exports = function generateRandomKey(){
	return Math.round(Math.random() * Math.pow(10, 15))
}