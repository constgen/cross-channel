
var chr = new CrossChannel('red')
var chg = new CrossChannel('green')
chr.on('message', handleMessageEvent)
chg.on('message', handleMessageEvent)
	
function handleMessageEvent(e){
	console.log('Content script ' + e.sourceChannel, e)
}

setTimeout(function(){
	chr.postMessage({"test":"data from Content script"})
}, 2000)
