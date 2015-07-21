var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');

describe("myQuizzes API endpoint", function(done){

	var options = {
        url: "http://localhost:3000/api/quiz",
        headers: {
            'cookie': "login=a"
        }
    }

    var returnedID;

    it("Login", function(done) {
        convert.nameToId("proj-1189-bind", function(id) {
            db.query("INSERT INTO tokens values ('a', ?)", id, function() {
                done();
            });
        });
    });

    it("should pull live quizzes from the database", function(done){
    	request.get(options, function(error, response, body) {
    		console.log(body);
    		var list = JSON.parse(body);
    		for(var i = 0; i < list.length; i++){
    			body = list[i];
    			assert.ok(body.title);
    			assert.ok(body.id);
    			assert.ok(body.results);
    		}
    		done();
    	});
	});

    //	these are not actally mocha tests
	// it("should list live quizzes", function(done){

	// });

	// it("should calculate the time until a quiz closes", function(done){

	// });

	// it("should begin quiz by clicking on a row in live quizzes", function(done){

	// });

	// it("should hide if no quizzes are available", function(done){

	// });

    it("Logout", function(done) {
        db.query("delete from tokens where cookie='a'", function() {});
        done();
    });
});