var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');


describe("results api tests: ", function(done){
	var userID = 0;

    var options = {
        url: "http://localhost:3000/api/900000/results",
        headers: {
            'cookie': "login=a"
        }
    }

    var returnedID = 900000;

    it("Login", function(done) {
        convert.nameToId("proj-1189-bind", function(id) {
        	userID = id;
            db.query("INSERT INTO tokens values ('a', ?)", id, function() {
                done();
            });
        });
    });

    it("Adds quizzes to the database", function(done) {
    	var query = "insert into quizzes SET id=?, title=?, results=?, publish=?";

    	db.query(query, [900000, "Quiz 1", "2025-07-23", "2015-07-01"], function(err, message) {
            if(err) {
                console.log("ADD QUIZ ERROR: -------------------- " + err);
            }

            console.log(message);
            done();
        });
    });
    
    it("Adds results to the database", function(done) {
    	var query = "insert into results SET quizid=?, userid=?, points=?";

    	db.query(query, [900000, userID, 12], function(err, message) {
            if(err) {
                console.log("ADD ERROR --------------------------- " + err);
            }

            console.log(message);
            done();
        });
    });

    it('Should find the results with the "viewed" flag set to 1', function(done){
    	request.post(options, function(err, response, body){
    		if(err) {
                console.log("POST ERROR: ----------------------- " + err);
            }
    	});

        db.query("select viewed from results where quizid=900000", function(err, message) {
            if(err) {
                console.log("ERROR: ---------------------- " + err);
            }
            //console.log(message);
            assert.equal(message[0].viewed, 1);
            done();
        });
    });

    it("Logout", function(done) {
        db.query("delete from tokens where cookie='a'", function() {});

        db.query('delete from results where quizid>=' + returnedID, function(){
        	db.query("delete from quizzes where id >=" + returnedID, function(){
            	db.query("alter table quizzes auto_increment=" + returnedID, function(){
                	done();
            	});
        	});
        });
    });
});