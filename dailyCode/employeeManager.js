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
            var name = employee.cn + '';
            getEmployeeId(name, function(id) {
            	counter();

            	if(id == -1) {
            		return;
            	}

            	if(typeof employee.thumbnailPhoto !== 'object') {
					console.log("User: " + name + " does not have an image.");
					return;
				}

				if(!isValidImage(employee.thumbnailPhoto)) {
					console.log("Image for user: " + name + "is not viewable");
					return;
				}

				console.log("ID: " + id);

				imageWriter.writeImage(pathToFile(id), employee.thumbnailPhoto);
            });
		});
	});
}

function isValidImage(image) {
	var imageSize = Object.getOwnPropertyNames(image).length;
	return (imageSize > 1000 && imageSize <10000);
}

function pathToFile(filename) {
	return (isProduction ? '/opt/qwizard/public/images/employees/' : 
		'../public/images/employees/') +
		 filename + '.jpg';
}

function getEmployeeId(name, callback) {
	db.query('SELECT id FROM users WHERE name=?', name, function(err, message) {
		if(err) {
			console.log("ERROR: Unable to query for user id", err);
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
			console.log("ERROR: Unable to insert the user into the db", err);
			callback(-1);
		} else {
			var newUserId = message.insertId;
			db.query('INSERT INTO photoMatchStats SET userId=?', newUserId, function(err, message){
				if (err) {
					console.log("ERROR: Failed to add photoMatchStats", err);
					callback(-1);
				}
				else {
					callback(newUserId);
				}
			});	
		} 
	});
}

module.exports = {
	grabEmployees: grabEmployees,
	getEmployeeId: getEmployeeId
};
