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

    beforeEach(function(done){
        convert.nameToId("proj-1189-bind", function(id) {
            userID = id;
            var total = 7;
            var count = 0;
            var finished = function(err, message){
                count++;
                if(count == total){
                    done();
                }
            };
            var query1 = "INSERT INTO tokens values ('a', ?)";
            var query2 = "insert into quizzes SET title=?, results=?, publish=?";
            var query3 = "insert into results SET quizid=?, userid=?, points=?";
            db.query(query1, id, function() {
                db.query(query2, ["Quiz 1", "2025-07-23", "2015-07-01"], finished);
                db.query(query2, ["Quiz 2", "2015-07-02", "2015-07-01"], finished);
                db.query(query2, ["Quiz 3", "2015-07-03", "2015-07-01"], finished);
                db.query(query2, ["Quiz 4", "2015-07-04", "2015-07-01"], finished);

                db.query(query3, [returnedID, userID, 12], finished);
                db.query(query3, [returnedID+1, userID, 15], finished);
                db.query(query3, [returnedID+2, userID, 18], finished);
            });
        });
    });

    afterEach(function(done){
        db.query("delete from tokens where cookie='a'", function() {});

        db.query('delete from results where quizid>=' + returnedID, function(){
            db.query("delete from quizzes where id >=" + returnedID, function(){
                db.query("alter table quizzes auto_increment=" + returnedID, function(){
                    done();
                });
            });
        });
    });

    it('should get the correct results in the correct order', function(done){
    	request.get(options, function(err, response, body){
    		var data = JSON.parse(body);
    		assert.equal(data.length, 3);
            assert.equal(data[0].title, "Quiz 4");
    		assert.equal(data[1].title, "Quiz 3");
    		assert.equal(data[2].title, "Quiz 2");
    		done();
    	});
    });
});