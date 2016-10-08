module.exports = function (grunt) {
	var DOC_DIR = 'doc',
		SRC_DIR = 'src',
		TEST_DIR = 'test',
		BUILD_DIR = 'dist',
 		TASKS_DIR = 'tasks',
		DEMO_DIR = 'demo',
		MODULE_NAME = 'cross-channel';

	grunt.initConfig({
		watch: {
			sources: {
				files: [
					SRC_DIR + '/**/*.js',
					SRC_DIR + '/**/*.json',
					TEST_DIR +  '/**/*.js',
					TEST_DIR +  '/**/*.json',
					DEMO_DIR +  '/**/*'
				],
				//tasks: ['jshint'],
				options: {
					interrupt: true,
					livereload: 35729
				}
			}
		},
		jshint: {
			dev: {
				options: {
					jshintrc: TASKS_DIR + '/.jshintrc'
				},
				src: [
					SRC_DIR + '/**/*.js'
				]
			}
		},
		jsdoc: {
			dist: {
				src: [SRC_DIR + '/**/*.js'],
				dest: DOC_DIR
			}
		},
		clean: {
			doc: [DOC_DIR],
			build: [BUILD_DIR],
			test: [TEST_DIR + '/test.js']
		},
		jasmine: {
			dev: {
				options: {
					//polyfills: [''],
					// vendor: [
					// 	'./node_modules/systemjs/dist/system.src.js'
					// ],
					//helpers: [''],
					keepRunner: false,
					outfile: TEST_DIR + '/test.html',
					specs: [TEST_DIR + '/test.js']
				}
			}
		},
		systemjs: {
			build: {
				src: SRC_DIR + '/index.js',
				dest: BUILD_DIR + '/' + MODULE_NAME + '.js',
				options: {
					baseURL: SRC_DIR,
					config: 'system.config.js',
					type: 'build', //build, bundle
					format: 'umd',
					minify: false,
					sourceMaps: true
				}
			},
			buildmin: {
				src: SRC_DIR + '/index.js',
				dest: BUILD_DIR + '/'+ MODULE_NAME + '.min.js',
				options: {
					baseURL: SRC_DIR,
					config: 'system.config.js',
					type: 'build', //build, bundle
					format: 'umd',
					minify: true,
					//mangle: true,
					sourceMaps: true
				}
			},
			test: {
				src:  TEST_DIR + '/spec.js',
				dest: TEST_DIR + '/test.js',
				options: {
					baseURL: TEST_DIR,
					config: 'system.config.js',
					type: 'build', //build, bundle
					format: 'umd',
					minify: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-systemjs-bundler');


	grunt.registerTask('live', ['watch']);
	grunt.registerTask('code', ['jshint:dev']);
	grunt.registerTask('doc', ['clean:doc', 'jsdoc']);
	grunt.registerTask('test', ['systemjs:test', 'jasmine', 'clean:test']);
	grunt.registerTask('build', ['clean:build', 'systemjs:build', 'systemjs:buildmin']);
};