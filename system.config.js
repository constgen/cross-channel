// default config
System.config({
	defaultJSExtensions: false,
	map: {

	},
	paths: {
		'../../src/*': 'source:*',
		'../../*': 'project:*',
		'project:*': '../*',
		'source:*': '../src/*'
	}
})

// custom config
System.config({
	meta: {
		'events': {	build: false }
	},
	paths: {
		'events': '../src/utils/noop.js'
	},
	map: {
		'es6-symbol': '../node_modules/es6-symbol',
		'es5-ext': '../node_modules/es5-ext',
		'd': '../node_modules/d/index.js'
	},
	packages: {
		'es6-symbol': {
			main: 'index.js',
			defaultExtension: 'js'
		},
		'es5-ext': {
			defaultExtension: 'js',
			map: {
				'./object/assign': './object/assign/index',
				'./object/keys': './object/keys/index',
				'./string/#/contains': './string/#/contains/index'
			}
		}
	}
})


