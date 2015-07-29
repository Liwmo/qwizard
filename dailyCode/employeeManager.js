var employeeRepository = require('./employeeRepository');
var imageWriter = require('./imageWriter');
var isProduction = process.env.NODE_ENV == 'production';

function grabEmployees() {
	employeeRepository.getAllEmployees(function(data){
		data.forEach(function(employee) {
			if(typeof employee.thumbnailPhoto !== 'object') {
				return;
			}

			// Filter out images that are less than 1KB or greater than 10KB, as these
			// images aren't viewable.
			var imageSize = Object.getOwnPropertyNames(employee.thumbnailPhoto).length;
			if(imageSize < 1000 || imageSize > 10000) {
				return;
			}

			imageWriter.writeImage(pathToFile(employee.cn), employee.thumbnailPhoto);
		});
	});
}

function pathToFile(name) {
	return (isProduction ? '/opt/qwizard/public/images/employees/' : 
		'../public/images/employees/') +
		 name + '.jpg';
}

module.exports = {
	grabEmployees: grabEmployees
};