var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var request = require('request');
var db = require('../database/db');
var today = (new Date()).toISOString().substr(0,10);

describe("Publish API endpoint", function(done){
    var baseUrl = "http://localhost:3000/";
    var totalRequests = 1000;
    var timeout = 35*1000;

    var createQuiz = {
        title: "Temp Quiz",
        results: today,
        publish: today,
        questions: JSON.stringify([{
            type: 'tf',
            text: 'Question',
            name: 'Category'
        }]),
        answers: JSON.stringify([[0]]),
        pointvalues: JSON.stringify([5])
    };

    var submitQuiz = [[1]];

    var options = function(url, data){
        return {
            url: baseUrl + url,
            form: JSON.parse(JSON.stringify(data)),
            headers: {
                'cookie': "login=a"
            }
        };
    };

    var returnedID;

    var start = new Date();

    it("Login", function(done) {
        convert.nameToId("proj-1189-bind", function(id) {
            db.query("INSERT INTO tokens values ('a', ?)", id, function() {
                done();
            });
        });
    });

    it("POST to /quiz to get base Quiz ID", function(done) {
        request.post(options('api/maker/quiz', createQuiz), function(error, response, body) {
            assert.ok(JSON.parse(body).id);
            returnedID = JSON.parse(body).id;
            console.log("Using " + totalRequests + " quizzes to test scalability");
            done();
        });
    });

    it('POST quizzes to the database', function(done){
        this.timeout(timeout);
        var requests = 0;
        var finished = function(){
            requests++;
            if(requests == totalRequests){
                done();
            }
        };
        for(var i = 0; i < totalRequests; i++){
            request.post(options('api/maker/quiz', createQuiz), finished);   
        }
    });

    it('GET quizzes from the database', function(done){
        this.timeout(timeout);
        var requests = 0;
        var finished = function(){
            requests++;
            if(requests == totalRequests){
                done();
            }
        };
        for(var i = 0; i < totalRequests; i++){
            request.get(options('api/maker/quiz/' + (i + returnedID + 1), createQuiz), finished);   
        }
    });

    it('POST answers to the database', function(done){
        this.timeout(timeout);
        var requests = 0;
        var finished = function(){
            requests++;
            if(requests == totalRequests){
                done();
            }
        };
        for(var i = 0; i < totalRequests; i++){
            request.post(options('api/quiz/' + (i + returnedID + 1), submitQuiz), finished);   
        }
    });

    it('GET results from the database', function(done){
        this.timeout(timeout);
        var requests = 0;
        var finished = function(){
            requests++;
            if(requests == totalRequests){
                done();
            }
        };
        for(var i = 0; i < totalRequests; i++){
            request.get(options('api/quiz/' + (i + returnedID + 1) + '/results', createQuiz), finished);   
        }
    });
    
    it("DELETE quizzes that were made", function(done) {
        this.timeout(timeout);
        var requests = 0;
        var finished = function(err, response, data){
            if(data.error) {
                console.log(data.error);
            }
            requests++;
            if(requests == totalRequests) {
                done();
            }
        };
        var delOptions = {
            url: baseUrl + "api/quiz",
            headers: {
                'cookie': "login=a"
            }
        };
        for (var i = 0; i < totalRequests+1; i++) {
            delOptions.url = baseUrl + "api/quiz/" + (returnedID + i);
            request.del(delOptions, finished);
        }
    });

    it("Logout and clean up database", function(done) {
        db.query("delete from tokens where cookie='a'", function() {
            done();
        });
        // db.query("delete from results where quizId >=" + (returnedID), function(){
        //     db.query("delete from quizzes where id >=" + (returnedID), function(){
        //         db.query("alter table quizzes auto_increment=" + (returnedID), function(){
        //             done();
        //         });
        //     });
        // });
    });

    it("should log how long it took", function(){
        var end = new Date();
        console.log((end.getTime() - start.getTime()) / 1000 + " secs");
    });

    
});