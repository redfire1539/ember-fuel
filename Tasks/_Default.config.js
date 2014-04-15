module.exports = function(grunt){
	return {
		clean: {
			Build: ['Build'],
			Dist:  ['Distribute'],
			Temp:  ['Temp'],
			All:   ['Temp', 'Build', 'Distribute']
  	},
  	jshint: {
  		self: ['Gruntfile.js']
  	}
	}
};