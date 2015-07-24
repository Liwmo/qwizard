var should = require('should');
var assert = require('assert');
var request = require('supertest');
var db = require('../database/db');
var tasks = require('../dailyCode/notificationGenerator');
var convert = require('../routes/userConversion');
var today = (new Date()).toISOString().substr(0,10);

var bindId = 1;

describe('Notification Generator Tests', function(){
	it('should set up database before tests', function(done){
		var totalQueries = 6;
		var finishedQueries = 0;
		var finished = function(err, message){
			finishedQueries++;
			if(finishedQueries == totalQueries){
				done();
			}
		};
		db.query('delete from results', function(err, message) {
			finished();
			db.query('delete from quizzes', function(err, message) {
				finished();
				convert.nameToId('proj-1189-bind', function(id) {
					bindId = id;
					db.query('delete from notifications where userId=' + bindId, function(err, message) {
						finished(err, message);
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
								userId: bindId,
								typeId: 1
							}, finished);
						});
					});
					db.query('insert into quizzes SET ?', {
						title: "",
						questions: "",
						answers: "",
						publish: today,
						results: "2222-01-01"
					}, finished);
				})
			});
		});
	});

	it('should add Notifications for quizzes available today', function(done){
		var notificationCount = 0;
		db.query('select * from notifications where userId=' + bindId, function(err, message){
			notificationCount = message.length;
			tasks.addAvailableNotifications(function(){
				db.query('select * from notifications where userId=' + bindId, function(err, message){
					assert.ok(message.length > notificationCount);
					done();
				});
			});
		});
	});

	it('should remove notifications for quiz results released today', function(done){
		var notificationCount = 0;
		db.query('select * from notifications where userId=' + bindId , function(err, message){
			notificationCount = message.length;
			tasks.removeAvailableNotifications(function(){
				db.query('select * from notifications where userId=' + bindId, function(err, message){
					assert.equal(message.length, notificationCount-1);
					done();
				});
			});
		});
	});
	it('should add notifications for quizzes that wrapped up today', function(done){
		var notificationCount = 0;
		db.query('select * from notifications where userId=' + bindId, function(err, message){
			notificationCount = message.length;
			tasks.addResultsNotifications(function(){
				db.query('select * from notifications where userId=' + bindId, function(err, message){
					assert.equal(message.length, notificationCount+1);
					done();
				});
			});
		});
	});


	it('should cleanup database', function(done){
		db.query('delete from notifications', function(err, message){
			db.query('delete from quizzes', function(err, message){
				done();				
			});
		});
	});
});