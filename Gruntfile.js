var fs = require('node-fs-extra');

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			server: {
				src: ['Gruntfile.js', 
							'server/features/**/*.js',
							'server/server.js',
							'server/routes/**/*.js',
							'server/manager/**/*.js',
							'server/dao/**/*.js',
							'server/util/**/*.js',
							'server/middleware/**/*.js',
							'server/config/**/*.js'
						]
			},
			client: {
				options: {
					extract: 'auto'
				},
				src: ['cliente/*.html']
			}
		},
		connect: {
 			server: {
 				options: {
					port: 9001,
					port: process.env.OPENSHIFT_NODEJS_PORT || 9001,
					hostname: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
 					base: 'cliente',
 					keepalive: true
 				}
 			}
		}
	
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	
	
	grunt.registerMultiTask('dist-client', 'Prepare client files to distribution', function() {
		var inDir = './server/public/';
		var outDir = inDir + 'dist/';
		grunt.log.writeln('Removing client/dist directory...');
		var done = this.async();
		fs.remove(outDir, function(err, result) {
			if (err) {
				grunt.log.error(err);
				done(err);
			} else {
				fs.mkdirsSync(outDir);
				grunt.task.run('vulcanize');
				fs.copySync(inDir + 'font', outDir + 'font');
				fs.copySync(inDir + 'img', outDir + 'img');
				fs.copySync(inDir + 'bower_components', outDir + 'bower_components');
				fs.copySync(inDir + 'css', outDir + 'css');
				fs.copySync(inDir + 'elements/point-setter/presenter.js', outDir  + 'elements/point-setter/presenter.js'); //TODO Minify this- Vulvanize can't do it
				done();
			}
		});
	});
	
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default', ['jshint:client','connect:server']);

	

};
