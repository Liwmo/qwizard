var should = require('should');
var assert = require('assert');
var request = require('supertest');
var db = require('../database/db');

describe("Quiz", function(){
    var url = 'localhost:3000/api/quiz/dummy_id';//test on the dummy id

    before(function(done){
        db.getConnection(function(err, connection){
            if(!err){
                done();
            }
        });
    });

    afterEach(function(done) {
        db.getConnection(function(err, connection) {
            connection.query('delete from results where quizid=1', function(err, message) {
                connection.release();
                if(err) {
                    console.log("ERROR WITH DELETE FROM TESTS" + err);
                }
                done();
            });
        });
    });

    it("gets quiz correctly", function(done){
        request(url).get('').send().end(function(err, res){
            if(!err){
                var quiz = JSON.parse(res.text);
                quiz.should.have.property('title','WWT Employee Handbook');
                quiz.should.have.property('questions').with.lengthOf(31);
            }
            done();
        });
    });

    it("post of correct answers returns perfect score", function(done){
        var data = [
            {answer: [2], type: 'mc'},
            {answer: [1], type: 'mc'},
            {answer: [1], type: 'mc'},
            {answer: [0], type: 'mc'},
            {answer: [3], type: 'mc'},
            {answer: [3], type: 'mc'},
            {answer: [1], type: 'tf'},
            {answer: [0,1], type: 'ms'},
            {answer: [0], type: 'tf'},
            {answer: [1], type: 'tf'},
            {answer: [0], type: 'tf'},
            {answer: [1], type: 'mc'},
            {answer: [0], type: 'mc'},
            {answer: [2], type: 'mc'},
            {answer: [1], type: 'mc'},
            {answer: [3], type: 'mc'},
            {answer: [3], type: 'mc'},
            {answer: [3], type: 'mc'},
            {answer: [0], type: 'mc'},
            {answer: [1], type: 'mc'},
            {answer: [1], type: 'tf'},
            {answer: [2], type: 'mc'},
            {answer: [1], type: 'mc'},
            {answer: [3], type: 'mc'},
            {answer: [1], type: 'tf'},
            {answer: [], type: 'ma'},
            {answer: [0], type: 'mc'},
            {answer: [3], type: 'mc'},
            {answer: [0], type: 'tf'},
            {answer: [0], type: 'tf'},
            {answer: [0,1,2], type: 'ms'}
        ];//all correct
        request(url).post('').send(data).end(function(err, res){
            if(!err){
                var score = JSON.parse(res.text);
                score.should.have.property('score', 71);
            }
            done();
        });
    });

    it("gives 2 points for correct multiple choice", function(done){
        var data = [
            {answer: [2], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'ms'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'ma'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'ms'}
        ];//all correct
        request(url).post('').send(data).end(function(err, res){
            if(!err){
                var score = JSON.parse(res.text);
                score.should.have.property('score', 7); //TODO: MATCHING ALWAYS IS RIGHT, FREE 5 POINTS
            }
            done();
        });
    });

    it("gives 2 points for correct true false", function(done){
        var data = [
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [1], type: 'tf'},
            {answer: [], type: 'ms'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'ma'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'ms'}
        ];//all correct
        request(url).post('').send(data).end(function(err, res){
            if(!err){
                var score = JSON.parse(res.text);
                score.should.have.property('score', 7); //TODO: MATCHING ALWAYS IS RIGHT, FREE 5 POINTS
            }
            done();
        });
    });

    it("gives 5 points for correct multiple select", function(done){
        var data = [
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'ms'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'ma'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'mc'},
            {answer: [], type: 'tf'},
            {answer: [], type: 'tf'},
            {answer: [0,1,2], type: 'ms'}
        ];//all correct
        request(url).post('').send(data).end(function(err, res){
            if(!err){
                var score = JSON.parse(res.text);
                score.should.have.property('score', 10); //TODO: MATCHING ALWAYS IS RIGHT, FREE 5 POINTS
            }
            done();
        });
    });

    // it("posts the proper data to the database", function(done) {
    //     var data = [
    //         {answer: [], type: 'mc'},
    //         {answer: [], type: 'mc'},
    //         {answer: [], type: 'mc'},
    //         {answer: [], type: 'tf'},
    //         {answer: [0,1], type: 'ms'},
    //         {answer: [], type: 'tf'},
    //         {answer: [], type: 'tf'}
    //     ];//all correct
    //     request(url).post('').send(data).end(function(err, res){
    //         if(!err){
    //             var score = JSON.parse(res.text);
    //             score.should.have.property('score', 5); //TODO: MATCHING ALWAYS IS RIGHT, FREE 5 POINTS
    //         }
    //         done();
    //     });
    // });
});