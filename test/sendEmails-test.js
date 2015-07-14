var should = require('should');
var assert = require('assert');
var request = require('supertest');
var db = require('../database/db');
var tasks = require('../dailyCode/emailGenerator');
var today = (new Date()).toISOString().substr(0,10);
var sinon = require('sinon');

describe('Send Email Tests', function() {
	describe('Format function', function() {
		it("Should properly format a given body with a given name", function(done) {
			var body = "{{name}}";
			var result = tasks.format(body, "bill.goodman");
			assert.equal(result, "Bill Goodman");
			done();
		});

		it("Should properly format a given body with a given random token", function(done) {
			var body = "{{token}}";
			var token = Math.random().toString();
			var result = tasks.format(body, "bill.goodman", token);
			assert.equal(result, token);
			done();
		});

		it("Should properly format a given body with a given quiz id", function(done) {
			var body = "{{id}}";
			var quizId = Math.random();
			var result = tasks.format(body, "bill.goodman", "", quizId);
			assert.equal(result, quizId.toString());
			done();
		});

		it("Should properly format a given body with all parameters", function(done) {
			var body = "{{name}}, {{token}}, {{id}}";
			var token = Math.random();
			var quizId = Math.random();
			var result = tasks.format(body, "bill.goodman", token, quizId);
			assert.equal(result, "Bill Goodman, " + token + ", " + quizId);
			done();
		});
	});

	describe('getQuizzes Function', function() {
		var quizID;

		beforeEach(function(done){
			db.query("insert into quizzes (answers, results, publish, title, questions, pointValues, author) VALUES ('', ?, ?, '', '','','')", [today, today], function(err, message){
				if(!err){
					quizID = message.insertId;
					done();
				}else{
					console.log(err);
				}
			});
		});

		it("Should get the quiz we added to the table", function(done){
			tasks.getQuizzes(function(data){
				assert.equal(data[data.length - 1].id, quizID);
				done();
			});
		});

		afterEach(function(done){
			db.query("delete from quizzes where id=" + quizID, function(err, message){
				if(!err){
					done();
				}
			});
		});
	});

	describe('getUsers Function', function() {
		beforeEach(function(done) {
			db.query("insert into users VALUES (999999, '', 0)", function(err, message){
				if(!err){
					done();
				}else{
					console.log(err);
				}
			});
		});

		it("Should get the user we added to the table", function(done) {
			tasks.getUsers(function(data) {
				assert.equal(data[0].id, 999999);
				done();
			});
		});

		afterEach(function(done) {
			db.query("delete from users where id=999999", function(err, message){
				if(!err){
					done();
				}else{
					console.log(err);
				}
			});
		});
	});

	describe('sendQuiz Test', function() {

		beforeEach(function() {
			sinon.stub(tasks.nodemailerTransport, "sendMail", function(opts, next){
				next();
			});
		});

		afterEach(function() {
			tasks.nodemailerTransport.sendMail.restore();
		});

		it("Should call email.sendMail once for 1 recipient", function(done) {
			tasks.sendQuiz(function(data) {
				assert.equal(true, tasks.nodemailerTransport.sendMail.called, "1 email was not sent for one recipient");
				done();
			}, {recipients: [{name: "devin.kiser", token:";lkjasd;fkljads"}], quizName: "Blah Quiz 90000", body: "asdfa", quizId: 2});
		});

		it("Should call email.sendMail twice for 2 recipients", function(done) {
			tasks.sendQuiz(function(data) {
				assert.equal(true, tasks.nodemailerTransport.sendMail.calledTwice, "2 emails were not sent for 2 recipients");
				done();
			}, {recipients: [{name: "devin.kiser", token:";lkjasd;fkljads"},{name: "devin.kiser", token:";lkjasd;fkljads"}], quizName: "Blah Quiz 90000", body: "asdfa", quizId: 2});
		});
	});

	describe('generateTokens Test', function() {
		var tokens;
		var users;
		beforeEach(function(done) {
			users = [];

			for(var i=0; i<10; i++) {
				users.push({
					id: i,
					name: "first.last"
				})
			}
			done();
		});

		it("Should create a list of tokens", function(done) {			
			tasks.generateTokens(function(users) {
				users.forEach(function(user) {
					assert.equal(50, user.token.length);
				});
				done();
			}, users);
		});
	});

	describe('insertTokens Test', function() {
		var users;

		beforeEach(function(done) {
			users = [];
			for(var i=0; i<10; i++) {
				users.push({
					id: i + 900000,
					token: "ABCDEFG" + i.toString()
				});
			}

			done();
		});

		it("Should insert the tokens into the database", function(done) {
			tasks.insertTokens(function() {
				users.forEach(function(user) {
					db.query("select id, token from emailTokens where id=?", user.id, function(err, message) {
						if(!err) {
							assert.equal(user.id, message[0].id);
							assert.equal(user.token, message[0].token);
						} else {
							console.log(err);
						}
					});
				});	
			}, users);

			done();
		});

		afterEach(function(done) {
			users.forEach(function(user) {
				db.query("delete from emailTokens where id=?", user.id, function(err, message) {
					if(err) {
						console.log(err);
					}
				});
			});

			done();
		});
	});
});