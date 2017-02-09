# CrossChannel

Cross origin messaging channel. Sends messages between different JavaScript contexts.

## Installation

In a **Browser** environment:

	<script src="path/to/connexionjs/dist/cross-channel.min.js"></script>
	<script>
		var channel = new CrossChannel('name')
		channel.on('message', handler)
		channel.postMessage(message)
	</script>

In a **CommonJS** environment first install it from NPM:

	$ npm install cross-channel

then in the source code use

	var CrossChannel = require('cross-channel')
	var channel = new CrossChannel('name')
	channel.on('message', handler)
	channel.postMessage(message)

## Reference

### `channel.name: String`

The name of a channel

### `channel.postMessage(message: Object)`

Sends a message to all other channel instances with the same name. Message can't be a DOM element or contain a DOM element. The message is cloned between different execution contexts.

### `channel.on('message', handler: Function)`

Attaches listener to a 'message' event. The handler is called only when message is sent from another instances with the same channel name, but not called when `postmessage()` is called on the same instance. The callback is executed with a single argument of MessageEvent object. The **event** interface:

	MessageEvent {
		type: String
		data: Object|Boolean|String|Number|Null|Undefined
		timeStamp: Number
		origin: String
		key: String
		sourceChannel: String
	}

### `channel.once('message', handler: Function)`

Attaches listener that is executed only once for the very first 'message' event.

### `channel.addEventListener('message', handler: Function)`

The alias to `channel.on()`. Necessary for a compatibility with **BroadcastChannel API** when used as a polifyll.

### `channel.removeEventListener('message', handler: Function)`

Removes an event handler of a 'message' event.

### `channel.removeAllListeners('message')`

Removes all event handlers of a 'message' event.

### `channel.close()`

Removes all channel event handlers and closes a channel to reveal memory.

## Examle
	var channelGreen1 = new CrossChannel('green')
	var channelGreen2 = new CrossChannel('green')

	channelGreen1.postMessage({text: 'message'})
	channelGreen2.on('message', function(event){
		console.log(event.data) // -> {text: 'message'}
	})

## Use cases:
- need a **BroadcastChannel** polifyll;
- developement of a multiple screen expirience in a browser;
- development of a JavaScript API for media players that are embedded in an `<iframe>`;
- need an unified messaging channel in browser extensions;
- messaging between all frames in a browser window;
- messaging between all windows/frames and background processes on NWJS platform;
- messaging between "Node" and "Webkit" context on the Node-webkit platform;
- messaging across tabs of the same origin
<!--- messaging between different main process and child processes in NodeJS-->

## Compatibility
<!-- http://www.tablesgenerator.com/markdown_tables -->
| Platforms         |  self  | frames | tabs |
|-------------------|:------:|:------:|:----:|
| NodeJS >=0.8      |    -   |   -    |   -  |
| Node-webkit <=0.11|    +   |   +    |   -  |
| NWJS >=0.13       |    +   |   +    |   +  |
| Electron          |    -   |   -    |   -  |
| Firefox           |    +   |   +    |   +  |
| Android Firefox   |    +   |   +    |   +  |
| Chrome            |    +   |   +    |   +  |
| Android Chrome    |    +   |   +    |   +  |
| Opera <=9         |        |   -    |   -  |
| Opera <=12        |    +   |   +    |   +  |
| Opera >=15        |    +   |   +    |   +  |
| Android Opera >=15|    +   |   +    |   +  |
| Opera mini        |    +   |   +    |   +  |
| Safari >=5        |    +   |   +    |   +  |
| iOS Safari        |    +   |   +    |   +  |
| Android browser   |        |        |      |
| IE >=9            |    +   |   +    |  +-  |
| Mobile IE >=10    |        |        |      |
| Edge              |    +   |   +-   |  +   |
| Chrome extension  |    +   |   +    |  +   |
| WebExtension      |    +   |   +    |  +   |
| Worker            |        |        |      |

<!--## Polyfills that may be required for old platforms:
- Object.create() (IE <=8, FF <=3.6, SF <5, iOS <=5.1, CH <6, OP <=11.50)-->

