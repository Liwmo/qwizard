var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');


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

    it("The previous POST should have added a quiz to the DB with the returnedID", function(done) {
        db.query("Select * from quizzes where id=?", returnedID, function(error, rows) {
            assert.ok(rows.length == 1);
            done();
        })
    });

    it("PUT to quiz/:id will return the same ID for a valid ID", function(done) {
        options.url = "http://localhost:3000/api/maker/quiz/" + returnedID;
        request.put(options, function(error, response, body) {
            assert.ok(JSON.parse(body).id == returnedID);
            done();
        });
    });

    it("PUT to quiz/:id will update the quiz", function(done) {
        options.url = "http://localhost:3000/api/maker/quiz/" + returnedID;
        options.form['title'] = "BLAH";
        request.put(options, function(error, response, body) {
            assert.ok(JSON.parse(body).id == returnedID);
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

    it("PUT to quiz/:id with publish date of today will call immediate.generateNotifications", function(done) {
        var today = (new Date()).toISOString().substr(0,10);
        options.form['publish'] = today;
        options.url = "http://localhost:3000/api/maker/quiz/" + returnedID;
        console.log("NOTE: THE ID IS: " + returnedID);
        request.put(options, function(error, response, body) {    });
        setTimeout(function() {
            db.query("select * from notifications where typeID=1 and quizId=" + returnedID, function(err, message) {
                if (err) {
                    console.log(err);
                    done();
                }
                if (message[0].quizId) {
                    assert.ok(message[0].quizId == returnedID);
                    db.query("delete from notifications where typeID=1 and quizId=" + returnedID, function(err, message) {
                        done();
                    });  
                }
                else {
                    console.log("quizId was not returned, basically SQL Query did not find a notification");
                    assert.ok(false);
                    done();
                }
            });
        }, 500);
    });

    it("PUT to quiz/:id of published quiz with null publish and results dates will update database ", function(done) {
        options.url = "http://localhost:3000/api/maker/quiz/";
        options.form['publish'] = "9999-01-01";
        options.form['results'] = "9999-01-02";
        request.post(options, function(error, response, body) {
            assert.ok(JSON.parse(body).id);
            var newId = JSON.parse(body).id;
            db.query("select publish, results from quizzes where id=" + newId, function(err, message) {
                if (err) {
                    console.log(err);
                    done();
                }
                assert.ok(message.length == 1);
                assert.ok(message[0].publish.valueOf() == new Date("9999-01-01 (CST)").valueOf());
                assert.ok(message[0].results.valueOf() == new Date("9999-01-02 (CST)").valueOf());
                console.log("lame");
                options.form['publish'] = null;
                options.form['results'] = null;
                options.url = "http://localhost:3000/api/maker/quiz/" + newId;
                request.put(options, function(error, response, body) {
                    assert.ok(response.statusCode == 200);
                    db.query("select publish, results from quizzes where id=" + newId, function(err, message) {
                        if (err) {
                            console.log(err);
                            done();
                        }
                        assert.ok(message.length == 1);
                        assert.ok(message[0].publish === null);
                        assert.ok(message[0].results === null);
                        done();                
                    });
                });
            });
        });
    });

    it('GET to quiz/:id returns quiz if author-quiz pair exists', function(done){
        request.get(options, function(error, response, body){
            body = JSON.parse(body);
            assert.ok(body.title);
            assert.ok(body.questions);
            done();
        });
    });

    it('GET to quiz/:id returns error if author-quiz pair does not exist', function(done){
        var badQuiz = 99999999;
        options.url = "http://localhost:3000/api/maker/quiz/" + badQuiz;
        request.get(options, function(error, response, body){
            body = JSON.parse(body);
            assert.ok(body.error);
            done();
        });
    });

    it("Logout", function(done) {
        db.query("delete from tokens where cookie='a'", function() {
        });
        db.query("delete from quizzes where id >=" + (returnedID-1), function(){
            db.query("alter table quizzes auto_increment=" + (returnedID-1), function(){
                done();
            });
        });
    });
});