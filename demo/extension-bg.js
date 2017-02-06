var chr = new CrossChannel('red')
var chg = new CrossChannel('green')
chr.on('message', handleMessageEvent)
chg.on('message', handleMessageEvent)
		
function handleMessageEvent(e){
	console.log('Background script ' + e.sourceChannel, e)
}
