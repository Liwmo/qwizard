var should = require('should');
var assert = require('assert');
var request = require('supertest');
var db = require('../database/db');

describe("Leaderboard", function(){
    var url = 'localhost:3000/api/leaderboard';

    before(function(done){
        db.getConnection(function(err, connection){
            if(!err){
                done();
            }
        });
    });

    it("gets leaderboard correctly", function(done){
        request(url).get('').send().end(function(err, res){
            if(!err){
                var leaderboard = JSON.parse(res.text);
                leaderboard.should.have.property('users').with.lengthOf(14);
            }
            done();
        });
    });
});