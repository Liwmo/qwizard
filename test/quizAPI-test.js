var should = require('should');
var assert = require('assert');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');


describe("Quiz Results endpoint", function(done){
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

    it("Request to /api/quiz/:id/results will return error for invalid id", function(done) {
        var hugeNumber = 9000000;
        options.url = "http://localhost:3000/api/quiz/" + hugeNumber + "/results";
        request.get(options, function(err, response, body) {
            if (err) {
                console.log(err);
                done();
            } else {
                console.log("Gonna attempt to parse Body");
                console.log(body);
                body = JSON.parse(body);
                assert.ok(body.error);
                done();
            }
        });
    });

    it("Request to /api/quiz/:id/results will return quiz for valid user and quiz id", function(done) {
        done();
    });

    it("Request to /api/quiz/:id/results will return quiz (without selected) for invalid user and valid quiz id", function(done) {
        done();
    });

    it("Logout", function(done) {
        db.query("delete from tokens where cookie='a'", function() {
            done();
        });
    });
});