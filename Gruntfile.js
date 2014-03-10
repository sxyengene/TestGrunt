'use strict';
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		assetsPath : 'css',
		srcPath : 'src',
		distPath: 'build',

		clean: ['<%= distPath%>/*','<%= distPath %>/utils/*'],
		
		depconcat: {
			options: {
				separator: '\n'
			},
			js: {
				cwd: '<%= srcPath %>',
				src: '*.js',
				dest: '<%= distPath %>/js',
				ext: '.js',
				expand:true
			},
			utilscopy: {
				cwd: '<%= srcPath %>/utils',
				src: '*.js',
				dest: '<%= distPath %>/js/utils',
				expand:true
			},
			css: {
				cwd: '<%= assetsPath %>',
				src: '*.css',
				dest: '<%= distPath %>/css',
				expand:true
			}
		},


		less:{
			compile:{
				cwd: '<%= assetsPath %>',
				src: '*.less',
				dest:'<%= distPath %>/css',
				expand:true,
				ext:'.css'
			}
		},

		uglify: {
			js: {
				cwd: '<%= srcPath %>',
				src: '*.js',
				dest: '<%= distPath %>/js',
				expand:true,		
				ext: '-min.js'
			}
		},

		cssmin: {
			 options: {
				 keepSpecialComments: 0
			 },
			 compress: {
					 cwd: '<%= distPath %>',
					 src: '*.css',
					 dest: '<%= distPath %>/css',
					 expand:true,
					 ext:'-min.css'
			 }
		},

		watch:{
			script:{
				files:['<%= assetsPath %>/*','<%= srcPath %>/*'],

				tasks:['build']
			}
		}
	});

	grunt.loadNpmTasks('grunt-depcombo');
	grunt.loadNpmTasks('grunt-depconcat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('build', ['less:compile','depconcat:js','depconcat:css','depconcat:utilscopy', 'uglify:js', 'cssmin:compress','watch:script']);
	grunt.registerTask('default', ['build']);
}