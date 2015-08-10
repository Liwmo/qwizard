var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');
var db = require('../database/db.js');

describe("user Conversion tests", function(){
    it('should return false when an unregistered id is passed in', function(done){
        convert.idToName(-1, function(result){
            assert.equal(result, false, 'result is not false');
            done();
        });
    });

    it('should return false when an unregistered name is passed in', function(done){
        convert.nameToId("bad.wolf", function(result){
            assert.equal(result, false, 'result is not false');
            done();
        });
    });

    it('should return dummy.account when id=1 is passed in', function(done){
        db.query('SELECT id FROM users WHERE name=?', 'proj-1189-bind', function(err, message) {
            convert.idToName(message[0].id, function(result) {
                assert.equal(result, 'proj-1189-bind');
                done();
            })
        });
    });

    it('should return 1 when dummy.account is passed in', function(done){
        convert.nameToId("proj-1189-bind", function(result){
            db.query('SELECT id FROM users WHERE name=?', 'proj-1189-bind', function(err, message) {
                assert.equal(result, message[0].id, 'result is not false');
                done();
            });

        });
    });
});