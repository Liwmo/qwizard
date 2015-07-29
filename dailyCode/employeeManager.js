var employeeRepository = require('./employeeRepository');
var imageWriter = require('./imageWriter');
var isProduction = process.env.NODE_ENV == 'production';

function grabEmployees() {
	employeeRepository.getAllEmployees(function(data){
		data.forEach(function(employee) {
			imageWriter.writeImage(pathToFile(employee.cn), employee.thumbnailPhoto);
		});
	});
}

function pathToFile(name) {
	return (isProduction ? '/opt/qwizard/public/images/employees/' : 
		'./public/images/employees/') +
		 name + '.jpg';
}

module.exports = {
	grabEmployees: grabEmployees
};