var should = require('should');
var assert = require('assert');
var request = require('supertest');
var db = require('../database/db');
var tasks = require('../dailyCode/sendEmails');
var today = (new Date()).toISOString().substr(0,10);

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
				assert.equal(data[data.length - 1].id, 999999);
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
});