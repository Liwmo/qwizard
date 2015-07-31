var should = require('should');
var assert = require('assert');
var request = require('supertest');
var db = require('../database/db');
var fs = require('fs');
var randomSet = require('../utilities/randomSet');
var path = require('path');

describe("myQuizzes API endpoint", function(done){
    var employees = [];
    for(var i = 0; i < 5; i++){
        employees.push({
            id: i - 20,
            name: 'first.last'
        });
        var filepath = path.join(__dirname, '../public/images/employees/' + (i - 20) + '.jpg');
        fs.closeSync(fs.openSync(filepath, 'w'));
    }

    it('should give back the desired number of employees', function(){
        assert.equal(randomSet(employees, 1).matchingClues.length, 1);
        assert.equal(randomSet(employees, 2).matchingClues.length, 2);
        assert.equal(randomSet(employees, 3).matchingClues.length, 3);
        assert.equal(randomSet(employees, 4).matchingClues.length, 4);
        assert.equal(randomSet(employees, 5).matchingClues.length, 5);
    });

    it('should have each employee be unique', function(){
        var checkUniqueSet = function(set){
            var checked1 = [];
            var checked2 = [];
            for(var i = 0; i < set.matchingClues.length; i++){
                assert.equal(checked1.indexOf(set.matchingClues[i]), -1);
                assert.equal(checked1.indexOf(set.matchingAnswers[i]), -1);
                checked1.push(set.matchingClues[i]);
                checked2.push(set.matchingAnswers[i]);
            }
        };

        for(var i = 0; i < 10; i++){
            checkUniqueSet(randomSet(employees, 4));
        }
    });

    it('should return users not in badSet parameter', function(){
        var badSet = [-20,-19,-18,-17];

        var set = randomSet(employees, 1, badSet);
        assert.equal(set.matchingClues.length, 1);
        assert.equal(set.matchingClues[0], -16);
    });

    it('should translate the cn to displayName', function(){
        var set = randomSet(employees, 1);
        assert.equal(set.matchingAnswers[0], "First Last");
    });

    it('should remove files', function(){
        for(var i = 0; i < 5; i++){
            var filepath = path.join(__dirname, '../public/images/employees/' + (i - 20) + '.jpg');
            fs.unlinkSync(filepath);
        }
    });
});