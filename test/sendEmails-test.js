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
					console.log("The quizId is " + quizID);
					done();
				}else{
					console.log(err);
				}
			});
		});

		it("Should get the quiz we added to the table", function(done){
			tasks.getQuizzes(function(data){
				var foundId = false;
				for (var i = 0; i < data.length; i++) {
					if (data[i].id == quizID)
						foundId = true;
				}
				assert.ok(foundId);
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
				var userFound = false;
				data.forEach(function(user) {
					if(user.id === 999999) {
						userFound = true;
					}
				});

				assert.equal(userFound, true);
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

	describe('emails.send Test', function(){
		var analyze = function(opts){
			assert.equal("first.last", opts.name);
			assert.equal("body", opts.body);
			assert.equal("ABCDEFG", opts.tokens[0]);
			assert.equal("Title", opts.quizzes[0].title);
		};

		beforeEach(function() {
			sinon.stub(tasks.emails, "sendToUser", function(next, opts){
				analyze(opts);
				next();
			});
		});

		afterEach(function(){
			tasks.emails.sendToUser.restore();
		});

		it('should pass all quizzes, body, all tokens, and user name to sendToUser for 1 user', function(done){
			tasks.emails.setQuizzes([{title: "Title"}]);
			tasks.emails.setBody("body");
			tasks.emails.send(function(){
				assert.equal(true, tasks.emails.sendToUser.called, "user was sent to");
				done();
			}, [{
				tokens: ["ABCDEFG"],
				name: "first.last"
			}]);
		});

		it('should pass all quizzes, body, all tokens, and user name to sendToUser for 2 users', function(done){
			tasks.emails.setQuizzes([{title: "Title"}]);
			tasks.emails.setBody("body");
			tasks.emails.send(function(){
				assert.equal(true, tasks.emails.sendToUser.calledTwice, "user was sent to");
				done();
			}, [
				{
					tokens: ["ABCDEFG"],
					name: "first.last"
				},
				{
					tokens: ["ABCDEFG"],
					name: "first.last"
				}
			]);
		});
	});

	describe('emails.sendToUser Test', function(){
		var analyze = function(opts){
			assert.equal("Title", opts.quizName);
			assert.equal(999999, opts.quizId);
			assert.equal("body", opts.body);
			assert.equal("first.last", opts.user);
			assert.equal("ABCDEFG", opts.token);
		};

		beforeEach(function() {
			sinon.stub(tasks.emails, "sendQuiz", function(next, opts){
				analyze(opts);
				next();
			});
		});

		afterEach(function(){
			tasks.emails.sendQuiz.restore();
		});

		it('should pass the corresponding quiz and token data to sendQuiz with 1 quiz', function(done){
			tasks.emails.sendToUser(function(){
				assert.equal(true, tasks.emails.sendQuiz.called, "quiz was sent");
				done();
			}, {
				name: "first.last", 
				tokens: ["ABCDEFG"],
				quizzes: [{
					title: "Title", 
					id: 999999
				}],
				body: "body"
			})
		});

		it('should pass the corresponding quiz and token data to sendQuiz with 2 quizzes', function(done){
			tasks.emails.sendToUser(function(){
				assert.equal(true, tasks.emails.sendQuiz.calledTwice, "quizzes were sent");
				done();
			}, {
				name: "first.last", 
				tokens: ["ABCDEFG", "ABCDEFG"],
				quizzes: [
					{
						title: "Title", 
						id: 999999
					},
					{
						title: "Title", 
						id: 999999
					}
				],
				body: "body"
			})
		});

	});

	describe('emails.sendQuiz Test', function() {

		beforeEach(function() {
			sinon.stub(tasks.nodemailerTransport, "sendMail", function(opts, next){
				next();
			});
		});

		afterEach(function() {
			tasks.nodemailerTransport.sendMail.restore();
		});

		it("Should call email.sendMail once for 1 recipient", function(done) {
			tasks.emails.sendQuiz(function(data) {
				assert.equal(true, tasks.nodemailerTransport.sendMail.called, "1 email was not sent for one recipient");
				done();
			}, {user: "devin.kiser", token:";lkjasd;fkljads", quizName: "Blah Quiz 90000", body: "asdfa", quizId: 2});
		});
	});

	describe('generateTokens Test', function() {
		var users;

		beforeEach(function(){
			sinon.stub(tasks.emails, "getQuizCount", function(){
				return 5;
			});

			users = [];

			for(var i=0; i<10; i++) {
				users.push({
					id: i,
					name: "first.last"
				});
			}

		});

		afterEach(function(){
			tasks.emails.getQuizCount.restore();
		});

		it("Should create a list of tokens for each user for each quiz", function(done) {			
			tasks.generateTokens(function(users) {
				users.forEach(function(user) {
					assert.equal(5, user.tokens.length);
					user.tokens.forEach(function(token){
						assert.equal(50, token.length);
					});
				});
				done();
			}, users);
		});
	});

	describe('insertTokens Test', function() {
		var users;

		beforeEach(function() {
			users = [];
			for(var i=0; i<10; i++) {
				users.push({
					id: i + 900000,
					tokens: ["ABCDEFG" + i.toString()]
				});
			}
		});

		it("Should insert the tokens into the database", function(done) {
			var count = 0;
			var tryDone = function(){
				count++;
				if(count == users.length){
					done();
				}
			};
			tasks.insertTokens(function() {
				users.forEach(function(user) {
					db.query("select id, token from emailTokens where id=?", user.id, function(err, message) {
						if(!err) {
							assert.equal(user.id, message[0].id);
							assert.equal(user.tokens[0], message[0].token);
						} else {
							console.log(err);
						}
						tryDone();
					});
				});	
			}, users);
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