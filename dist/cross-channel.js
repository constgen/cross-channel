!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==typeof c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('2', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = function () {
		return function () {};
	};
	return module.exports;
});
$__System.registerDynamic('3', ['2'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var createNoop = $__require('2');

	function Handler(callback, identifier) {
		callback = callback || createNoop();
		if (callback[identifier]) {
			return callback[identifier];
		} else {
			callback[identifier] = this;
			this.callback = callback;
			this.next = undefined;
			this.prev = undefined;
		}
	}

	Handler.prototype.call = function (event) {
		var callback = this.callback;
		callback(event);
	};

	module.exports = Handler;
	return module.exports;
});
$__System.registerDynamic('4', ['3'], true, function ($__require, exports, module) {
	'use strict';

	//var Symbol = require('es6-symbol')

	var define,
	    global = this || self,
	    GLOBAL = global;
	var Handler = $__require('3');

	function HandlersCollection() {
		this.head = new Handler();
		this.tail = new Handler();
		this.head.next = this.tail;
		this.tail.prev = this.head;
		this.identifier = Symbol();
	}

	HandlersCollection.prototype.handle = function (event) {
		var handler = this.head.next;
		while (handler) {
			handler.call(event);
			handler = handler.next;
		}
		//handler.call(event)
	};

	HandlersCollection.prototype.push = function (callback) {
		var handler = new Handler(callback, this.identifier);
		var last = this.tail.prev;

		if (handler.next) {
			//is already in collection
			return;
		}
		handler.next = this.tail;
		this.tail.prev = handler;
		handler.prev = last;
		last.next = handler;
	};

	HandlersCollection.prototype.remove = function (callback) {
		var handler = new Handler(callback, this.identifier);
		var prev = handler.prev;
		var next = handler.next;

		if (prev) {
			prev.next = next;
		}
		if (next) {
			next.prev = prev;
		}
	};

	HandlersCollection.prototype.empty = function () {
		this.head.next = this.tail;
		this.tail.prev = this.head;
	};

	module.exports = HandlersCollection;
	return module.exports;
});
$__System.registerDynamic('5', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	function MessageEvent(config) {
		config = config || {};
		var message = config.data || {};

		// if (!message) {
		// 	return this; //EXIT, if message is empty
		// }

		if (typeof message === 'string') {
			try {
				message = JSON.parse(message);
			} catch (err) {
				console.error(err, event);
			}
		}

		//connextionMessageRegExp = /^__([A-Za-z]+?)__:/;
		// connectionCretaria,
		// connectionType,
		// connectionMatch,
		// data;

		// //parse message without try-catch
		// if (message && typeof message === 'string') {
		// 	connectionMatch = message.match(connextionMessageRegExp);

		// 	if (connectionMatch) {
		// 		connectionCretaria = connectionMatch[0];
		// 		connectionType = connectionMatch[1];
		// 		if (connectionType === messageType) {
		// 			data = JSON.parse(message.substr(connectionCretaria.length));
		// 		}
		// 	}
		// }

		Object.defineProperties(this, {
			'data': {
				value: message.data, //extract usefull data from a message
				writable: false
			},
			'timeStamp': {
				value: config.timeStamp || 0,
				writable: false
			},
			'key': {
				value: message.key,
				writable: false
			}
		});
	}

	MessageEvent.prototype = Object.create(self.MessageEvent.prototype);
	MessageEvent.prototype.constructor = MessageEvent;

	module.exports = MessageEvent;
	return module.exports;
});
$__System.registerDynamic('6', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	function Message(data, key) {
		this.data = data;
		this.key = key;
	}

	// Message.prototype.toJSON = function(){
	// 	return this
	// }
	Message.prototype.asJSON = function () {
		return JSON.stringify(this);
	};

	// _createEvent = function (event) {
	// 	return '__connexionEvent__:' + JSON.stringify(event);
	// }

	module.exports = Message;
	return module.exports;
});
$__System.registerDynamic('7', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = function generateRandomKey() {
		return Math.round(Math.random() * Math.pow(10, 15));
	};
	return module.exports;
});
$__System.registerDynamic('8', [], true, function ($__require, exports, module) {
	'use strict';
	/**
  * Creates a collection of all child frames/iframes windows objects. Takes into a count deeper nested frames.
  * @param [Window] topWin - Main document window, where to search child frames
  * @returns [Array] - Array of all child windows.
  */

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = function getAllChildWindows(topWin) {
		var windows = [];
		var frames = topWin.frames;
		var win;
		var i = frames.length;

		while (i--) {
			win = frames[i];
			windows.push(win);
			//include deeper level frames
			windows = windows.concat(getAllChildWindows(win));
		}

		return windows;
	};
	return module.exports;
});
$__System.registerDynamic('9', [], true, function ($__require, exports, module) {
	var define,
	    global = this || self,
	    GLOBAL = global;
	var __filename = 'utils\\environment.js',
	    __dirname = '';
	(function (self, nodeGlobal, browserWindow, undefined) {
		'use strict';

		var window = self.window || browserWindow || {};
		var location = window.location || {};
		var global = nodeGlobal || ('top' in window ? window.top.global || {} : {}); //NodeJS `global`
		var isNodeJs = 'require' in global && 'process' in global && global.global === global && typeof __dirname !== 'undefined'; //NodeJS context

		//export
		exports.window = window;
		exports.global = global;
		exports.location = location;
		exports.isNodeJs = isNodeJs;
		exports.undefined = undefined;
	})(this, typeof global !== 'undefined' ? global : null, typeof window !== 'undefined' ? window : null);
	return module.exports;
});
$__System.registerDynamic('a', ['5', '6', '7', '8', '9'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var MessageEvent = $__require('5');
	var Message = $__require('6');
	var generateRandomKey = $__require('7');
	var getAllChildWindows = $__require('8');
	var environment = $__require('9');

	var global = environment.global;

	function Transport() {
		this.port = global.window;
		this.origin = '*'; //location = global.window.location, location && (location.origin || (location.protocol + '//' + location.host)) || '*'
		this.listeners = [];
		this.key = generateRandomKey();
	}

	Transport.prototype.send = function (data) {
		var origin = this.origin;
		var message = new Message(data, this.key);
		var index = -1;
		var browserWindow = global.window || {};
		var topBrowserWindow = browserWindow.top;
		var browserFrames = topBrowserWindow && [topBrowserWindow].concat(getAllChildWindows(topBrowserWindow)) || [];

		//this.port.postMessage(message, origin) //!!!!!!!!!!!!!!!!!!!!
		while (++index in browserFrames) {
			try {
				browserFrames[index].postMessage(message, origin);
			} catch (err) {
				console.error(err, data);
				//var e;
				//e = win.document.createEvent('Event')
				//e.initEvent('message', false, false)
				//e.data = message
				//e.origin = this.origin
				//e.source = window
				//win.dispatchEvent(e)
			}
		}
	};

	Transport.prototype.onMessageEvent = function (handler) {
		var transport = this;
		function listener(event) {
			var messageEvent = new MessageEvent(event);
			if ('key' in messageEvent && transport.key !== messageEvent.key) {
				//skip events that was returned back or are not native
				handler(messageEvent);
			}
		}
		if (this.port && this.port.addEventListener) {
			this.port.addEventListener('message', listener);
			this.listeners.push(listener);
		}
	};

	Transport.prototype.close = function () {
		var listeners = this.listeners;
		var port = this.port;
		var index = listeners.length;
		while (index--) {
			port.removeEventListener('message', listeners[index]);
		}
		this.listeners.length = 0;
	};

	module.exports = Transport;
	return module.exports;
});
$__System.registerDynamic('b', ['a'], true, function ($__require, exports, module) {
	'use strict';

	//var Transport = require('./broadcastchannel.transport.js')

	var define,
	    global = this || self,
	    GLOBAL = global;
	var Transport = $__require('a');

	function Channel(id) {
		Transport.call(this, id);
	}

	Channel.prototype = Object.create(Transport.prototype);
	Channel.prototype.constructor = Channel;

	module.exports = Channel;
	return module.exports;
});
$__System.registerDynamic('1', ['4', 'b'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var HandlersCollection = $__require('4');
	var Channel = $__require('b');

	function CrossChannel(name) {
		var crosschannel = this;
		if (!arguments.length) {
			throw new TypeError('Failed to construct \'CrossChannel\': 1 argument required, but only 0 present');
		}
		if (!(this instanceof CrossChannel)) {
			throw new TypeError('Failed to construct \'CrossChannel\': Please use the \'new\' operator, this constructor cannot be called as a function.');
		}
		this.name = String(name);
		this.onmessage = null;
		this.closed = false;
		this.messageHandlers = new HandlersCollection();

		this.channel = new Channel(this.name);

		this.channel.onMessageEvent(function (event) {
			crosschannel.messageHandlers.handle(event);
			if (typeof crosschannel.onmessage === 'function') {
				crosschannel.onmessage(event);
			}
		});
	}

	CrossChannel.prototype.on = CrossChannel.prototype.addEventListener = function (type, handler) {
		this.messageHandlers.push(handler);
	};

	CrossChannel.prototype.removeEventListener = function (type, handler) {
		this.messageHandlers.remove(handler);
	};

	CrossChannel.prototype.removeAllListeners = function () {
		this.messageHandlers.empty();
	};

	CrossChannel.prototype.once = function (type, handler) {
		var crosschannel = this;
		function removeHandler() {
			crosschannel.messageHandlers.remove(handler);
			crosschannel.messageHandlers.remove(removeHandler);
		}
		this.messageHandlers.push(handler);
		this.messageHandlers.push(removeHandler);
	};

	CrossChannel.prototype.postMessage = function (message) {
		if (!arguments.length) {
			throw new TypeError('Failed to execute \'postMessage\' on \'CrossChannel\': 1 argument required, but only 0 present.');
		}
		if (this.closed) {
			return;
		}
		this.channel.send(message);
	};

	CrossChannel.prototype.close = function () {
		this.channel.close();
		this.messageHandlers.empty();
		this.closed = true;
	};

	CrossChannel.prototype.valueOf = function () {
		return '[object CrossChannel]';
	};

	module.exports = CrossChannel;
	return module.exports;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=cross-channel.js.map