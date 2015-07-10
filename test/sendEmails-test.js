var should = require('should');
var assert = require('assert');
var request = require('supertest');
var db = require('../database/db');
var tasks = require('../dailyCode/sendEmails');
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
		beforeEach(function(done){
			db.query("insert into quizzes VALUES (999999, '', ?, ?, '', '')", [today, today], function(err, message){
				if(!err){
					done();
				}else{
					console.log(err);
				}
			});
		});

		it("Should get the quiz we added to the table", function(done){
			tasks.getQuizzes(function(data){
				assert.equal(data[0].id, 999999);
				done();
			});
		});

		afterEach(function(done){
			db.query("delete from quizzes where id=999999", function(err, message){
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

	describe('createToken Tests', function() {
		var user = {name: "Bill", id: 999999};

		it("Should generate an emailToken and insert into the database for our user", function(done) {
			tasks.createToken(function(token, user) {
				db.query("select id, name, token from emailTokens where id=?", user.id, function(err, message) {
					if(!err) {
						assert.equal(user.id, message[0].id);
						assert.equal(user.name, message[0].name);
						assert.equal(token, message[0].token);
					}	
					else {
						assert.equal(true, false);
					}
					done();
				});
			}, user);
		});

		afterEach(function(done) {
			db.query("delete from emailTokens where id=?", user.id, function(err, message){
				if(err){
					console.log(err);
				}
				done();
			});
		});
	});

	describe('getBody Tests', function() {
		it("Should get an html page", function(done) {
			tasks.getBody(function(data) {
				assert.ok(data, "data is not defined");
				done();
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
});