var userSetter = require('../dailyCode/quizUserCountSetter');
var db = require('../database/db');
var should = require('should');
var assert = require('assert');

var today = (new Date()).toISOString().substr(0,10);

describe('User Count Setter Test', function(){
	var quiz = {
		title: 'Quiz going to get possibleTakerCount',
		publish: null,
		results: today
	}

	var quizId, userCount;

	it('get current user count', function(done){
		db.query('select count(id) as count from users', function(err, message){
			if(err){
				console.log('Database query error!');
				assert.ok(false);
			}else{
				console.log('user count: ', message[0].count);
				userCount = message[0].count;
			}
			done();
		});
	});

	it('insert a quiz ready to close into the database', function(done) {
		db.query('INSERT INTO quizzes SET ?', quiz, function(err, message) {
			if(err) {
				console.log('Database query error!');
				assert.ok(false);
			} else {
				console.log('insertId: ', message.insertId);
				quizId = message.insertId;
			}
			done();
		});
	});

	it('updateUserCount should return set quiz value equal to number of users', function(done){
		userSetter.updateUserCount(function() {
			console.log('Called updateUserCount');
			db.query('SELECT possibleTakerCount FROM quizzes WHERE id=?', quizId, function(err, message) {
				if(err) {
					console.log('Database query error!');
					assert.ok(false);
				} else {
					assert.equal(userCount, message[0].possibleTakerCount);
				}
				done();
			});
		});
	});

	it('should cleanup database', function(done) {
		db.query('DELETE FROM quizzes where id=?', quizId, function(err, message) {
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