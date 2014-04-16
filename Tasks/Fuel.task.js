module.exports = function(grunt) {
	grunt.registerTask('fuel', ['neuter:fuel', 'jshint:fuel', 'uglify:fuel', 'copy:toDemo']);
	grunt.registerTask('fuel-watch', ['watch:fuel']);
};