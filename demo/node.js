'use strict'

var CrossChannel = require('../src/index.js')
//var CrossChannel = require('../dist/cross-channel.js')

function handleEvent (event){
	//console.log('timeStamp: ' + event.timeStamp)
	//console.log('origin: ' + event.origin)
	//console.log('sourceChannel: ' + event.sourceChannel)
	//console.log('key: ' + event.key)
	console.log('Node Main', JSON.stringify(event.data, null, 2))
}

var channel1 = new CrossChannel('green')
var channel2 = new CrossChannel('green')
var channel3 = new CrossChannel('green')

channel1.on('message', handleEvent)
channel2.on('message', handleEvent)
channel1.postMessage({message: 'test'})

setTimeout(function(){channel1.postMessage({message: 'test2'})}, 150)
setTimeout(function(){channel3.postMessage({message: 'test3'})}, 150)