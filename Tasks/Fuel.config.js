module.exports = function(grunt){
	return {
		neuter: {
			options: {
				basePath: "Libraries/"
			},
			fuel: {
				src: 'Libraries/Fuel.js',
				dest: 'ember-fuel.js'
			}
		},
		uglify: {
			fuel: {
				options: {
					mangle: false,
					sourceMap: 'ember-fuel.map.js',

					compress: {
						drop_console: true
					}
				},
				files: {
					'ember-fuel.min.js' : ['ember-fuel.js']
				}
			}
		},
		jshint: {
			fuel: ['ember-fuel.js']
		},
		copy: {
			toDemo: {
				files: [
					{
						expand: true,
						src: ['ember-fuel*.js'],
						dest: 'Demo/public/'
					}
				]
			}
		}
	}
};