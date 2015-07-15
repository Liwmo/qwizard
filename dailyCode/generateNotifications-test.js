var should = require('should');
var assert = require('assert');
var request = require('supertest');
var db = require('../database/db');
var tasks = require('../dailyCode/notificationGenerator');
var today = (new Date()).toISOString().substr(0,10);

var firstQuiz = 0;

describe('Notification Generator Tests', function(){
	it('should set up database before tests', function(done){
		var totalQueries = 3;
		var finishedQueries = 0;
		var finished = function(err, message){
			firstQuiz = firstQuiz || message.insertId;
			finishedQueries++;
			if(finishedQueries == totalQueries){
				done();
			}
		};
		db.query('insert into quizzes SET ?', {
			title: "",
			questions: "",
			answers: "",
			publish: "2015-01-01",
			results: today
		}, function(err, message){
			finished(err, message);
			db.query('insert into notifications SET ?', {
				quizId: message.insertId,
				userId: 123456789,
				typeId: 1
			}, finished);
		});
		db.query('insert into quizzes SET ?', {
			title: "",
			questions: "",
			answers: "",
			publish: today,
			results: "2222-01-01"
		}, finished);
	});

	it('should add Notifications for quizzes available today', function(done){
		var notificationCount = 0;
		db.query('select * from notifications', function(err, message){
			notificationCount = message.length;
			tasks.addAvailableNotifications(function(){
				db.query('select * from notifications', function(err, message){
					assert.ok(message.length > notificationCount);
					done();
				});
			});
		});
	});

	it('should remove notifications for quiz results released today', function(done){
		var notificationCount = 0;
		db.query('select * from notifications', function(err, message){
			notificationCount = message.length;
			tasks.removeAvailableNotifications(function(){
				db.query('select * from notifications', function(err, message){
					assert.ok(message.length < notificationCount);
					done();
				});
			});
		});
	});

	it('should add Notifications for quizzes available today', function(done){
		var notificationCount = 0;
		db.query('select * from notifications', function(err, message){
			notificationCount = message.length;
			tasks.addResultsNotifications(function(){
				db.query('select * from notifications', function(err, message){
					assert.ok(message.length > notificationCount);
					done();
				});
			});
		});
	});

	it('should cleanup database', function(done){
		db.query('delete from notifications where quizId>=?', firstQuiz, function(err, message){
			db.query('delete from quizzes where id>=?', firstQuiz, function(err, message){
				db.query('alter table quizzes auto_increment=', firstQuiz, function(){
					done();
				});
			});
		});
	});
});