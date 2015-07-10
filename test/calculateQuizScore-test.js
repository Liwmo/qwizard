var should = require('should');
var assert = require('assert');

var calculateQuizScore = require('../utilities/utilities').calculateQuizScore;

describe('quiz score calculation test', function(){
	var correctAnswers = [
		[1],
		[0],
		[1],
		[3],
		[1, 3],
		[0, 1, 2]
	];	

	var selectedAnswers = [
		{
			answer: [0], // Incorrect
		},
		{
			answer: [0], // Correct
		},
		{
			answer: [0], // Incorrect
		},
		{
			answer: [3], // Correct
		},
		{
			answer: [1, 3] // Correct
		},
		{
			answer: [0, 1, 2, 3] //Incorrect
		}
	];

	var pointValues = [
		2,
		2,
		2,
		2,
		5,
		5
	];


    it('should fail when it is ran', function(done){
    	assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, pointValues), 9);
    	done();
   	});
 });