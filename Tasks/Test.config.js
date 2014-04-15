module.exports = function(grunt){
	return {
		copy: {
			testReadme: {
  			src: ['Vendors/README'],
  			dest: 'Build/README.txt'
  		}
  	}
	}
};