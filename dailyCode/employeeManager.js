var employeeRepository = require('./employeeRepository');
var imageWriter = require('./imageWriter');
var db = require('../database/db');
var isProduction = process.env.NODE_ENV == 'production';

function grabEmployees() {
	employeeRepository.getAllEmployees(function(data){
		var count = 0;
		var counter = function() {
			count++; 
			console.log(count, data.length);
			if(count == data.length) {
				process.exit();
			}
		}

		data.forEach(function(employee, index) {
			if(typeof employee.thumbnailPhoto !== 'object') {
				console.log("User: " + employee.cn + " does not have an image.");
				counter();
				return;
			}

			//console.log(employee.cn + '');
			// console.log(pathToFile(employee.cn).toString('utf-8'));
			// console.log(typeof employee.cn);

			// Filter out images that are less than 1KB or greater than 10KB, as these
			// images aren't viewable.
			var imageSize = Object.getOwnPropertyNames(employee.thumbnailPhoto).length;
			if(imageSize < 1000 || imageSize > 10000) {
				console.log("Image for user: " + employee.cn + " is not viewable.");
				counter();
				return;
			}

			var cn = employee.cn + '';
			// function call to get employeeId, if it returns -1 then dont save image
            getEmployeeId(cn, function(id) {
            	if(id != -1) {
					imageWriter.writeImage(pathToFile(id), employee.thumbnailPhoto);
					counter();
            	}
            });
            // employee == data.employee.length;
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
			callback(-1);
		} else if(message.length) {
			callback(message[0].id);
		} else {
			insertEmployee(name, function(id) {
				callback(id);
			});
		}
	});
}

function insertEmployee(name, callback) {
	db.query('INSERT INTO users SET name=?', name, function(err, message) {
		if(err) {
			callback(-1);
		} else {
			callback(message.insertId);	
		} 
	});
}

module.exports = {
	grabEmployees: grabEmployees
};