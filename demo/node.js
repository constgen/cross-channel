'use strict'

var CrossChannel = require('../src/index.js')
//var CrossChannel = require('../dist/cross-channel.js')

function handleEvent (event){
	console.log('timeStamp: ' + event.timeStamp)
	console.log('origin: ' + event.origin)
	console.log('sourceChannel: ' + event.sourceChannel)
	console.log('key: ' + event.key)
	console.log(JSON.stringify(event.data, null, 2))
}

var channel1 = new CrossChannel('1')
var channel2 = new CrossChannel('1')

channel1.on('message', handleEvent)
channel2.on('message', handleEvent)
channel1.postMessage({message: 'test'})
