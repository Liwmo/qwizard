var employeeManager = require('../dailyCode/employeeManager');
var db = require('../database/db');
var should = require('should');
var assert = require('assert');

describe('Employee Manager Test', function(){
	var existingUser = {
		name: 'test.moo',
		id: null
	}

	var newUser = {
		name: 'test.chicken',
		id:null
	}

	it('insert a user into the database', function(done) {
		db.query('INSERT INTO users SET name=?', existingUser.name, function(err, message) {
			if(err) {
				console.log('Database query error!');
				assert.ok(false);
			} else {
				console.log('insertId: ', message.insertId);
				existingUser.id = message.insertId;
			}
			done();
		});
	});

	it('getEmployeeId should return id if a user already exists in the database', function(done){
		employeeManager.getEmployeeId(existingUser.name, function(id) {
			console.log('returned id: ', id);
			assert.equal(id, existingUser.id);
			done();
		});
	});

	it('getEmployeeId should insert user into the database and return newly created id if user does not exist', function(done){
		employeeManager.getEmployeeId(newUser.name, function(id) {
			db.query('SELECT id FROM users WHERE name=?', newUser.name, function(err, message) {
				if(err) {
					console.log('Database query error!');
					assert.ok(false);
				} else {
					newUser.id = message[0].id;
					assert.equal(id, newUser.id);
				}
				done();
			})
		})
	});

	it('should cleanup database', function(done) {
		db.query('DELETE FROM users where id=?', existingUser.id, function(err, message) {
			if(err) {
				console.log('Error cleaning up database');
				assert.ok(false);
			} else {
				assert.equal(message.affectedRows, 1);
			}

			done();
		});
	});
});