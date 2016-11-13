System.config({
	map: {
		'es6-symbol': '../node_modules/es6-symbol',
		'es5-ext': '../node_modules/es5-ext',
		'd': '../node_modules/d/index.js',
		'json': '../node_modules/systemjs-plugin-json/json.js' //loader plugin
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

System.config({
	defaultJSExtensions: false,
	map: {
		'../../src/': 'source:',
		'../../': 'project:'
	},
	paths: {
		'project:*': '../*',
		'source:*': '../src/*'
	}
})
