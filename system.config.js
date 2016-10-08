System.config({
	defaultJSExtensions: false,
	transpiler: 'traceur',
	meta: {
		'*.json': {loader: 'json'}
	},
	map: {
		'../../src/': 'source:',
		'../../': 'project:',
		'traceur': '../node_modules/bower-traceur/traceur.js',
		'es6-symbol': '../node_modules/es6-symbol',
		'es5-ext': '../node_modules/es5-ext',
		'd': '../node_modules/d/index.js',
		'json': '../node_modules/systemjs-plugin-json/json.js' //loader plugin
	},
	paths: {
		'project:*': '../*',
		'source:*': '../src/*'
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
