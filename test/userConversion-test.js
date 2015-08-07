var should = require('should');
var assert = require('assert');
var request = require('supertest');
var convert = require('../routes/userConversion');

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
});