var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');


describe("UserScore API endpoint: ", function(done){
	var userID = 0;

    var options = {
        url: "http://localhost:3000/api/userscore",
        headers: {
            'cookie': "login=a"
        }
    }

    var returnedID;

    it("Login", function(done) {
        convert.nameToId("proj-1189-bind", function(id) {
        	userID = id;
            db.query("INSERT INTO tokens values ('a', ?)", id, function() {
                done();
            });
        });
    });

    it("Adds quizzes to the database", function(done) {
    	var total = 4;
    	var count = 0;
    	var finished = function(err, message){
    		returnedID = returnedID || message.insertId;
    		count++;
    		if(count == total){
    			done();
    		}
    	};
    	var query = "insert into quizzes SET title=?, results=?, publish=?";

    	db.query(query, ["Quiz 1", "2025-07-23", "2015-07-01"], finished);
    	db.query(query, ["Quiz 2", "2015-07-02", "2015-07-01"], finished);
    	db.query(query, ["Quiz 3", "2015-07-03", "2015-07-01"], finished);
    	db.query(query, ["Quiz 4", "2015-07-02", "2015-07-01"], finished);
    });
    
    it("Adds results to the database", function(done) {
    	var total = 3;
    	var count = 0;
    	var finished = function(err, message){
    		count++;
    		if(count == total){
    			done();
    		}
    	};
    	var query = "insert into results SET quizid=?, userid=?, points=?";

    	db.query(query, [returnedID, userID, 12], finished);
    	db.query(query, [returnedID+1, userID, 15], finished);
    	db.query(query, [returnedID+2, userID, 18], finished);
    });

    it('should get the correct results in the correct order', function(done){
    	request.get(options, function(err, response, body){
    		var data = JSON.parse(body);
    		assert.equal(data.length, 2);
    		assert.equal(data[0].title, "Quiz 3");
    		assert.equal(data[1].title, "Quiz 2");
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