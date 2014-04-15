module.exports = function(grunt) {
	grunt.registerTask('fuel', ['neuter:fuel', 'jshint:fuel', 'uglify:fuel']);
};