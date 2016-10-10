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
$__System.registerDynamic('4', ['5', '3'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var Symbol = $__require('5');
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
$__System.registerDynamic('6', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var validTypes = { object: true, symbol: true };

	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try {
			String(symbol);
		} catch (e) {
			return false;
		}

		// Return 'true' also for polyfills
		if (!validTypes[typeof Symbol.iterator]) return false;
		if (!validTypes[typeof Symbol.toPrimitive]) return false;
		if (!validTypes[typeof Symbol.toStringTag]) return false;

		return true;
	};
	return module.exports;
});
$__System.registerDynamic('7', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = function () {
		var assign = Object.assign,
		    obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return obj.foo + obj.bar + obj.trzy === 'razdwatrzy';
	};
	return module.exports;
});
$__System.registerDynamic('8', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) {
			return false;
		}
	};
	return module.exports;
});
$__System.registerDynamic('9', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var keys = Object.keys;

	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};
	return module.exports;
});
$__System.registerDynamic('a', ['8', '9'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = $__require('8')() ? Object.keys : $__require('9');
	return module.exports;
});
$__System.registerDynamic("b", [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};
	return module.exports;
});
$__System.registerDynamic('c', ['a', 'b'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var keys = $__require('a'),
	    value = $__require('b'),
	    max = Math.max;

	module.exports = function (dest, src /*, …srcn*/) {
		var error,
		    i,
		    l = max(arguments.length, 2),
		    assign;
		dest = Object(value(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};
	return module.exports;
});
$__System.registerDynamic('d', ['7', 'c'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = $__require('7')() ? Object.assign : $__require('c');
	return module.exports;
});
$__System.registerDynamic('e', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var forEach = Array.prototype.forEach,
	    create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	module.exports = function (options /*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};
	return module.exports;
});
$__System.registerDynamic('f', [], true, function ($__require, exports, module) {
  // Deprecated

  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = function (obj) {
    return typeof obj === 'function';
  };
  return module.exports;
});
$__System.registerDynamic('10', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var str = 'razdwatrzy';

	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return str.contains('dwa') === true && str.contains('foo') === false;
	};
	return module.exports;
});
$__System.registerDynamic('11', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString /*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};
	return module.exports;
});
$__System.registerDynamic('12', ['10', '11'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = $__require('10')() ? String.prototype.contains : $__require('11');
	return module.exports;
});
$__System.registerDynamic('13', ['d', 'e', 'f', '12'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var assign = $__require('d'),
	    normalizeOpts = $__require('e'),
	    isCallable = $__require('f'),
	    contains = $__require('12'),
	    d;

	d = module.exports = function (dscr, value /*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== 'string') {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set /*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};
	return module.exports;
});
$__System.registerDynamic('14', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = function (x) {
		if (!x) return false;
		if (typeof x === 'symbol') return true;
		if (!x.constructor) return false;
		if (x.constructor.name !== 'Symbol') return false;
		return x[x.constructor.toStringTag] === 'Symbol';
	};
	return module.exports;
});
$__System.registerDynamic('15', ['14'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var isSymbol = $__require('14');

	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};
	return module.exports;
});
$__System.registerDynamic('16', ['13', '15'], true, function ($__require, exports, module) {
	// ES2015 Symbol polyfill for environments that do not support it (or partially support it)

	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var d = $__require('13'),
	    validateSymbol = $__require('15'),
	    create = Object.create,
	    defineProperties = Object.defineProperties,
	    defineProperty = Object.defineProperty,
	    objPrototype = Object.prototype,
	    NativeSymbol,
	    SymbolPolyfill,
	    HiddenSymbol,
	    globalSymbols = create(null),
	    isNativeSafe;

	if (typeof Symbol === 'function') {
		NativeSymbol = Symbol;
		try {
			String(NativeSymbol());
			isNativeSafe = true;
		} catch (ignore) {}
	}

	var generateName = function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0,
			    name,
			    ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += postfix || '';
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}();

	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
		return SymbolPolyfill(description);
	};

	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
		if (isNativeSafe) return NativeSymbol(description);
		symbol = create(HiddenSymbol.prototype);
		description = description === undefined ? '' : String(description);
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return globalSymbols[key] = SymbolPolyfill(String(key));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),

		// If there's native implementation of given symbol, let's fallback to it
		// to ensure proper interoperability with other native functions e.g. Array.from
		hasInstance: d('', NativeSymbol && NativeSymbol.hasInstance || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', NativeSymbol && NativeSymbol.isConcatSpreadable || SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', NativeSymbol && NativeSymbol.iterator || SymbolPolyfill('iterator')),
		match: d('', NativeSymbol && NativeSymbol.match || SymbolPolyfill('match')),
		replace: d('', NativeSymbol && NativeSymbol.replace || SymbolPolyfill('replace')),
		search: d('', NativeSymbol && NativeSymbol.search || SymbolPolyfill('search')),
		species: d('', NativeSymbol && NativeSymbol.species || SymbolPolyfill('species')),
		split: d('', NativeSymbol && NativeSymbol.split || SymbolPolyfill('split')),
		toPrimitive: d('', NativeSymbol && NativeSymbol.toPrimitive || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', NativeSymbol && NativeSymbol.toStringTag || SymbolPolyfill('toStringTag')),
		unscopables: d('', NativeSymbol && NativeSymbol.unscopables || SymbolPolyfill('unscopables'))
	});

	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () {
			return this.__name__;
		})
	});

	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () {
			return 'Symbol (' + validateSymbol(this).__description__ + ')';
		}),
		valueOf: d(function () {
			return validateSymbol(this);
		})
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
		var symbol = validateSymbol(this);
		if (typeof symbol === 'symbol') return symbol;
		return symbol.toString();
	}));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag, d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive, d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));
	return module.exports;
});
$__System.registerDynamic('5', ['6', '16'], true, function ($__require, exports, module) {
  'use strict';

  var define,
      global = this || self,
      GLOBAL = global;
  module.exports = $__require('6')() ? Symbol : $__require('16');
  return module.exports;
});
$__System.registerDynamic('17', ['5', '18', '19', '1a', '1b', '1c'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var Symbol = $__require('5');
	var PostMessageTransport = $__require('18');
	var MessageEvent = $__require('19');
	var Message = $__require('1a');
	var getAllChildWindows = $__require('1b');
	var environment = $__require('1c');

	var global = environment.global;

	function getGUI(window) {
		return window && window.nwDispatcher.requireNwGui();
	}

	function whenGuiReadyThen(callback) {
		var gui = getGUI(global.window);
		if (gui) {
			callback(gui);
			return;
		}
		var timerId = setInterval(function () {
			gui = getGUI(global.window);
			if (gui) {
				clearInterval(timerId);
				callback(gui);
			}
		}, 10);
	}

	function getNWWindowThen(callback) {
		whenGuiReadyThen(function (gui) {
			var nwWindow = gui.Window.get();
			callback(nwWindow);
		});
	}

	// getNWWindowThen(function (nwWindow) {
	// 	//listen, when new page is open
	// 	nwWindowwin.on('loaded', function () {
	// 		var browserWindow = global.window;
	// 		//listen main window only once
	// 		if (!browserWindow[omen]) {
	// 			browserWindow[omen] = true; //mark as listened by Node
	// 			attachMessageHandlers();
	// 		}
	// 	});
	// });

	function Transport(id) {
		PostMessageTransport.call(this, id);
		delete this.port; //clear reference to a window
	}
	Transport.prototype = Object.create(PostMessageTransport.prototype);
	Transport.prototype.constructor = Transport;
	//computed `this.port`
	Object.defineProperty(Transport.prototype, 'port', {
		get: function () {
			return global.window;
		},
		set: function (value) {}
	});

	Transport.prototype.send = function (data) {
		var origin = this.origin;
		var message = new Message(data, this);
		var browserWindow = this.port || {};
		var topBrowserWindow = browserWindow.top;
		var browserFrames = topBrowserWindow && [topBrowserWindow].concat(getAllChildWindows(topBrowserWindow)) || [];

		getNWWindowThen(function (nwWindow) {
			var index = -1;
			while (++index in browserFrames) {
				//.replace(/'/g, '\\\'')
				nwWindow.eval(browserFrames[index].frameElement || null, 'window.postMessage(' + JSON.stringify(message.asJSON()) + ', "' + origin + '")');
			}
		});
	};

	Transport.prototype.onMessageEvent = function (handler) {
		var transport = this;
		function listener(e) {
			var window = this;
			var nativeMessageEventWorks = window.MessageEvent && window.MessageEvent.length;
			var event = nativeMessageEventWorks ? new window.MessageEvent('message', e) : e; //fixes crashes in NWjs, when read `e.data`
			var messageEvent = new MessageEvent(event);

			if ('key' in messageEvent && 'sourceChannel' in messageEvent && transport.name === messageEvent.sourceChannel && transport.key !== messageEvent.key //skip events that was returned back or are not native
			) {
					handler(messageEvent);
				}
		}
		if (this.port && this.port.addEventListener) {
			this.port.addEventListener('message', listener);
			this.listeners.push(listener);
		}
	};

	// Transport.prototype.close = function () {
	// 	var listeners = this.listeners
	// 	var port = this.port
	// 	var index = listeners.length
	// 	while (index--) {
	// 		port.removeEventListener('message', listeners[index])
	// 	}
	// 	this.listeners.length = 0
	// }

	module.exports = Transport;
	return module.exports;
});
$__System.registerDynamic('19', ['1c'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var environment = $__require('1c');

	var window = environment.window;
	var EventConstructor = window.MessageEvent || Object;

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
			'origin': {
				value: config.origin || '',
				writable: false
			},
			'key': {
				value: message.key,
				writable: false
			},
			'sourceChannel': {
				value: message.sourceChannel,
				writable: false
			}
		});
	}

	MessageEvent.prototype = Object.create(EventConstructor.prototype);
	MessageEvent.prototype.constructor = MessageEvent;

	module.exports = MessageEvent;
	return module.exports;
});
$__System.registerDynamic('1a', [], true, function ($__require, exports, module) {
	'use strict';

	/**
  * Message entity constructor
  * @param {*} data - any data to be transfered
  * @param {Object} [source] - source sent from
  */

	var define,
	    global = this || self,
	    GLOBAL = global;
	function Message(data, source) {
		source = source || {};
		this.data = data;
		this.key = source.key;
		this.sourceChannel = source.name;
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
$__System.registerDynamic('1d', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	module.exports = function generateRandomKey() {
		return Math.round(Math.random() * Math.pow(10, 15));
	};
	return module.exports;
});
$__System.registerDynamic('1b', [], true, function ($__require, exports, module) {
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
$__System.registerDynamic('1c', [], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var __filename = 'utils\\environment.js',
	    __dirname = '';
	!function (self, nodeGlobal, browserWindow, undefined) {
		var window = self.window || browserWindow || {};
		var location = window.location || {};
		var global = nodeGlobal || ('top' in window ? window.top.global || {} : {}); //NodeJS `global`

		var isNode = 'require' in global && 'process' in global && global.global === global && typeof __dirname !== 'undefined'; //NodeJS context

		//export
		exports.window = window;
		exports.global = global;
		exports.location = location;
		exports.isNode = isNode;
		exports.undefined = undefined;
	}(this, typeof global !== 'undefined' ? global : null, typeof window !== 'undefined' ? window : null);
	return module.exports;
});
$__System.registerDynamic('18', ['19', '1a', '1d', '1b', '1c'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var MessageEvent = $__require('19');
	var Message = $__require('1a');
	var generateRandomKey = $__require('1d');
	var getAllChildWindows = $__require('1b');
	var environment = $__require('1c');

	var global = environment.global;

	function Transport(name) {
		this.port = global.window;
		this.origin = '*'; //location = global.window.location, location && (location.origin || (location.protocol + '//' + location.host)) || '*'
		this.listeners = [];
		this.name = name;
		this.key = generateRandomKey();
	}

	Transport.prototype.send = function (data) {
		var origin = this.origin;
		var message = new Message(data, this);
		var index = -1;
		var browserWindow = this.port;
		var topBrowserWindow = browserWindow.top;
		var browserFrames = topBrowserWindow && [topBrowserWindow].concat(getAllChildWindows(topBrowserWindow)) || [];

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
			if ('key' in messageEvent && 'sourceChannel' in messageEvent && transport.name === messageEvent.sourceChannel && transport.key !== messageEvent.key //skip events that was returned back or are not native
			) {
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
$__System.registerDynamic('1e', ['1c', '17', '18'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var environment = $__require('1c');

	var Transport;

	//Transport = require('./broadcastchannel.transport.js')
	if (environment.isNode) {
		Transport = $__require('17');
	} else {
		Transport = $__require('18');
	}

	function Channel(id) {
		Transport.call(this, id);
	}

	Channel.prototype = Object.create(Transport.prototype);
	Channel.prototype.constructor = Channel;

	module.exports = Channel;
	return module.exports;
});
$__System.registerDynamic('1', ['4', '1e'], true, function ($__require, exports, module) {
	'use strict';

	var define,
	    global = this || self,
	    GLOBAL = global;
	var HandlersCollection = $__require('4');
	var Channel = $__require('1e');

	function CrossChannel(name) {
		var crosschannel = this;
		if (!arguments.length) {
			throw new TypeError('Failed to construct \'CrossChannel\': 1 argument required, but only 0 present.');
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