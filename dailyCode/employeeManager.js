var employeeRepository = require('./employeeRepository');
var imageWriter = require('./imageWriter');
var db = require('../database/db');
var isProduction = process.env.NODE_ENV == 'production';

function grabEmployees() {
	employeeRepository.getAllEmployees(function(data){
		data.forEach(function(employee, index) {
			if(typeof employee.thumbnailPhoto !== 'object') {
				return;
			}

			//console.log(employee.cn + '');
			// console.log(pathToFile(employee.cn).toString('utf-8'));
			// console.log(typeof employee.cn);

			// Filter out images that are less than 1KB or greater than 10KB, as these
			// images aren't viewable.
			var imageSize = Object.getOwnPropertyNames(employee.thumbnailPhoto).length;
			if(imageSize < 1000 || imageSize > 10000) {
				return;
			}

			var cn = employee.cn + '';
			// function call to get employeeId, if it returns -1 then dont save image
			
			if(index == 100) {
				var id = 'something';
				id = insertEmployee('mike.johnson');
				console.log(id)
			}

			
			

			imageWriter.writeImage(pathToFile(employee.cn), employee.thumbnailPhoto);
		});
	});
}

function pathToFile(filename) {
	return (isProduction ? '/opt/qwizard/public/images/employees/' : 
		'../public/images/employees/') +
		 filename + '.jpg';
}

function getEmployeeId(name, callback) {
	db.query('SELECT id FROM users WHERE name=?', name, function(err, message) {
		if(err) {
			return -1;
		}

		if(message.length) {
			return message[0].id;
		}

		return insertEmployee(name);
	});
}

function insertEmployee(name) {
	db.query('INSERT INTO users SET name=?', name, function(err, message) {
		if(err) {
			return -1;
		}

		return message.insertId;
	});
}

module.exports = {
	grabEmployees: grabEmployees
};