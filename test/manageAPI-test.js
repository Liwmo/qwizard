var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');


describe.only("Manage API endpoint", function(done){
    var options = {
        url: "http://localhost:3000/maker/",
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

    describe("Drafts API Call", function(done) {
        beforeEach(function(done) {
            var quiz = {
                id: 999999,
                title: "My Draft",
                questions: 'Some Collection'
            };

            var publishedQuiz = {
                id: 999998,
                title: "Published Quiz",
                questions: 'Published Collection',
                publish: "2015-07-08",
                results: "2015-07-09"
            };

            db.query("Insert into quizzes SET ?", quiz, function(err, message) {
                if(err) {
                    console.log(err);
                }
                db.query("Insert into quizzes SET ?", publishedQuiz, function(err, message) {
                    done();
                });
            });
        });

        it('Should grab our draft from the database', function(done) {
            options.url = "http://localhost:3000/api/maker/manage/drafts"
            request.get(options, function(err, response, body) {
                if (err || !body.length) {
                    console.log(err);
                    done();
                } else {
                    body = JSON.parse(body);
                    assert.ok(body[0].id == 999999);
                    assert.ok(body[0].title == "My Draft");
                    assert.ok(body[0].questions == "Some Collection");
                    done();
                }
            });
        });

        it('Should not grab only non-published quizzes', function(done) {
            options.url = "http://localhost:3000/api/maker/manage/drafts"
            request.get(options, function(err, response, body) {
                if (err || !body.length) {
                    console.log(err);
                    done();
                } else {
                    body = JSON.parse(body);
                    assert.ok(body.length == 1);
                    done();
                }
            });
        });

        afterEach(function(done) {
            db.query("delete from quizzes", function(err, message) {
                if(err) {
                    console.log(err);
                }

                done();
            });
        });
    });
});