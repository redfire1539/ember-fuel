module.exports = function(grunt){
	'use strict';

	/** Global Variables and Libraries **/
	var env = process.env.NODE_ENV || 'dev';
  var _ = require('lodash');

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  /** Load Task Configuration Files **/
	var configFiles = grunt.file.expand({ filter: "isFile" }, ['./Tasks/*.config.js']);
	grunt.log.writeln('Gathering Task config files:'.underline.green);

  var configArray = configFiles.map(function(taskConfigFile){
  	grunt.log.writeln('  => importing : ' + taskConfigFile.underline.cyan);
    return require(taskConfigFile)(grunt, env);
  });

  var packageJSON = grunt.file.readJSON('package.json');
  delete packageJSON.devDependencies;

  var mainConfig = {
    packageConfig: packageJSON
  };

  var defaultTasks = ['clean:All', 'jshint:self'];
  packageJSON.tasks.forEach(function(Item) {
    defaultTasks.push(Item);
  });

  configArray.forEach(function(configElement){ mainConfig = _.merge(mainConfig, configElement); });

  grunt.initConfig(mainConfig);

  /** Load Task Registrations **/
  var taskFiles = grunt.file.expand({ filter: "isFile" }, ['./Tasks/*.task.js']);
  grunt.log.writeln('Gathering Task registration files:'.underline.green);

	taskFiles.forEach(function(taskRegFile){
  	grunt.log.writeln('  => registering : ' + taskRegFile.underline.cyan);
    return require(taskRegFile)(grunt);
  });

  /** Default and Main Tasks **/
  grunt.registerTask('default', defaultTasks);


  /** Debug Task Files **/
  grunt.registerTask('debug:config', 'Debug imported configuration', function() {
    grunt.log.subhead('* Imported Configuration : *');
    grunt.log.writeln(JSON.stringify(mainConfig, undefined, 2));
  });
};