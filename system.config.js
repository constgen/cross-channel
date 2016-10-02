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
		'es6-symbol': '../node_modules/es6-symbol/index.js',
		'json': '../node_modules/systemjs-plugin-json/json.js', //loader plugin
	},
	paths: {
		'project:*': '../*',
		'source:*': '../src/*',
		'../node_modules/es6-symbol/*': '../node_modules/es6-symbol/*.js',	
	}
});
