var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');


describe("Manage API endpoint", function(done){
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

    describe("Drafts API Call", function(done) {
        beforeEach(function(done) {
            var quiz = {
                id: 999999,
                title: "My Draft",
                questions: ''
            };

            db.query("Insert into quizzes SET ?", quiz, function(err, message) {
                if(err) {
                    console.log(err);
                }

                done();
            });
        });

        it('Should grab our draft from the database', function(done) {
            options.url = "http://localhost:3000/api/maker/manage/drafts"
            request.get(options, function(err, response, body) {
                if (err) {
                    console.log(err);
                    done();
                } else {
                    body = JSON.parse(body);
                    assert.ok(body.id);
                    assert.ok(body.title);
                    assert.ok(body.questions);
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