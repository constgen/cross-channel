'use strict'

var CrossChannel = require('../src/index.js')
//var CrossChannel = require('../dist/cross-channel.js')

function handleEvent (event){
	console.log('Node Child 1', JSON.stringify(event.data, null, 2))
}

var channel = new CrossChannel('green')
channel.on('message', handleEvent)
channel.postMessage({from: 'node child 1'})
