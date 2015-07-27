var should = require('should');
var assert = require('assert');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');


describe("Quiz Results endpoint", function(done){
    var options = {
        url: "http://localhost:3000/maker/",
        headers: {
            'cookie': "login=a",
            'content-type': 'application/json'
        },
        form: {
            'title': 'BLAHBLAH' 
        }
    }

    var quizId;
    var bindId;

    it("Login", function(done) {
        convert.nameToId("proj-1189-bind", function(id) {
            bindId = id;
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
                body = JSON.parse(body);
                assert.ok(body.error);
                done();
            }
        });
    });
    it("Request to /api/quiz/:id/results will return quiz (without selected) for invalid user and valid quiz id", function(done) {
        var quiz = {
            answers: "[[2]]",
            results: "12-5-2014",
            publish: "12-4-2014",
            pointvalues: "[5]",
            title: "Title",
            questions: '[{"type":"ms","text":"TestQuestionText","answers":["TestAnswer","TestAnswer","TestAnswer"],"name":"TestQuestion"}]',
            author: bindId
        }

        db.query("insert into quizzes SET ?", quiz, function(err, message) {
            quizId = message.insertId;
            options.url = "http://localhost:3000/api/quiz/" + quizId + "/results";
            request.get(options, function(err, response, body) {
                if (err) {
                    console.log(err);
                    done();
                } else {
                    body = JSON.parse(body);
                    assert.ok(body.answers);
                    assert.ok(body.pointvalues);
                    done();
                }     
            });
        });
        
    });

    it("Attempting to POST quiz results after the publish date will return error", function(done) {
        delete options.form; 
        options.body = JSON.stringify([{"answer":[1]}]);
        options.url = "http://localhost:3000/api/quiz/" + quizId;

        request.post(options, function(err, response, body) {
            body = JSON.parse(body);
            assert.ok(body.error);
            console.log(body);
            done();
        });
    });

    it("Request to /api/quiz/:id/results will return quiz for valid user and quiz id", function(done) {
        var quizTaken = {
            quizid: quizId,
            userid: bindId,
            points: 9001,
            answers: "[[2]]"
        };

        db.query("update results SET ? WHERE quizid=?", [quizTaken, quizId], function(err, message) {
            options.url = "http://localhost:3000/api/quiz/"+quizId+"/results";
            request.get(options, function(err, response, body) {
                if (err) {
                    console.log(err);
                    done();
                } else {
                    body = JSON.parse(body);
                    assert.ok(body.answers);
                    assert.ok(body.selected);
                    assert.ok(body.pointvalues);
                    done();
                }
            });
        });
    });


    it("Logout", function(done) {
        db.query("delete from results where quizid=" + quizId, function() {
            db.query("delete from quizzes where id=" + quizId, function() {
                db.query("delete from tokens where cookie='a'", function() {
                    db.query("alter table quizzes auto_increment=" + quizId, function(){
                        done();
                    })
                });
            });
        });
    });
});