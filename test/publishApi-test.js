var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');
var convert = require('../routes/userConversion');
var sinon = require('sinon');


describe("Publish API endpoint", function(done){
    var options = {
        url: "http://localhost:3000/maker/",
        headers: {
            'cookie': "login=a"
        },
        form: {
            'title': 'BLAHBLAH' 
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

    it("POST to /quiz should return the saved quiz's ID", function(done) {
        options.url = "http://localhost:3000/api/maker/quiz/";
        request.post(options, function(error, response, body) {
            assert.ok(JSON.parse(body).id);
            done();
        });
    });

    it("Consecutive POST to /quiz should return an incremented quiz ID", function(done) {
        options.url = "http://localhost:3000/api/maker/quiz/";
        request.post(options, function(error, response, body) {
            returnedID = JSON.parse(body).id;
            assert.ok(returnedID);
            request.post(options, function(error, response, body) {
                assert.ok(JSON.parse(body).id);
                assert.ok(returnedID == JSON.parse(body).id-1)
                done();
            });
        });
    });

    it("The previous POST should have added a quiz to the DB with the returnedID", function() {
        db.query("Select * from quizzes where id=?", returnedID, function(error, rows) {
            assert.ok(rows.length == 1);
        })
    });

    it("PUT to quiz/:id will return success for a valid ID", function(done) {
        options.url = "http://localhost:3000/api/maker/quiz/" + returnedID;
        request.put(options, function(error, response, body) {
            assert.ok(body == "success");
            done();
        });
    });
    it("PUT to quiz/:id will update the quiz", function(done) {
        options.url = "http://localhost:3000/api/maker/quiz/" + returnedID;
        options.form['title'] = "BLAH";
        request.put(options, function(error, response, body) {
            assert.ok(body == "success");
            db.query("Select title from quizzes where id=" + returnedID, function(err, message) {
                assert.ok(message[0].title == "BLAH");
                done();
            });
        });
    });

    it("PUT to quiz/:id of quiz I'm not the author will expect error", function(done) {
        excessivelyLargeNumber = 9000000;
        options.url = "http://localhost:3000/api/maker/quiz/" + excessivelyLargeNumber;
        request.put(options, function(error, response, body) {
            assert.ok(JSON.parse(body).error);
            done();
        });
    });

    it("Logout", function(done) {
        db.query("delete from tokens where cookie='a'", function() {
            done();
        });
    });
});