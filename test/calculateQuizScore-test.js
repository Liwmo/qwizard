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

    it('should award the specified points for a multiple select question if only the correct answers are selected', function(done) {
		var selectedAnswers = [
			{
				answer: [0, 1, 2]
			}
		];

   		var correctAnswers = [
			[0, 1, 2]
		];	

		var pointValue = 10;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), pointValue);
		done();
   	}); 

   	it('should award zero points for a multiple select question if additional answers are selected', function(done) {
   		var selectedAnswers = [
			{
				answer: [0, 1, 2, 3]
			}
		];

   		var correctAnswers = [
			[0, 1, 2]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), 0);
		done();
   	}); 

   	it('should award zero points for a multiple select question if less answers are selected', function(done) {
		var selectedAnswers = [
			{
				answer: [0, 1]
			}
		];

		var correctAnswers = [
			[0, 1, 2]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), 0);
		done();
	});

	it('should award zero points for a multiple select question if no answers are selected', function(done) {
		var selectedAnswers = [
			{
				answer: []
			}
		];

		var correctAnswers = [
			[1, 2]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), 0);
		done();
	}); 

	it('should award specified points when multiple choice is answered correctly', function(done) {
		var selectedAnswers = [
			{
				answer: [100]
			}
		];

		var correctAnswers = [
			[100]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), pointValue);
		done();
	}); 

    it('should award zero points for a multiple choice question if answered incorrectly', function(done) {
		var selectedAnswers = [
			{
				answer: [0]
			}
		];

		var correctAnswers = [
			[2]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), 0);
		done();
	});

	it('should award zero points for a multiple choice question if no answers are selected', function(done) {
		var selectedAnswers = [
			{
				answer: []
			}
		];

		var correctAnswers = [
			[2]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), 0);
		done();
	}); 

	it('should award specified points for a true/false question if answered correctly', function(done) {
		var selectedAnswers = [
			{
				answer: [1]
			}
		];

		var correctAnswers = [
			[1]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), pointValue);
		done();
	}); 

	it('should award zero points for a true/false question if answered incorrectly', function(done) {
		var selectedAnswers = [
			{
				answer: [0]
			}
		];

		var correctAnswers = [
			[1]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), 0);
		done();
	}); 

	it('should award zero points for a true/false question if no answers are selected', function(done) {
		var selectedAnswers = [
			{
				answer: []
			}
		];

		var correctAnswers = [
			[1]
		];	

		var pointValue = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointValue]), 0);
		done();
	});

	it('should award max number of points for a matching question if all matches are made correctly', function(done) {
		var selectedAnswers = [
			{
				answer: ["clue1:answer1", "clue2:answer2", "clue3:answer3", "clue4:answer4"]
			}
		];

		var correctAnswers = [
			["clue1:answer1", "clue2:answer2", "clue3:answer3", "clue4:answer4"]
		];	

		var pointsPerCorrectMatch = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointsPerCorrectMatch]), pointsPerCorrectMatch * 4);
		done();
	});

	it('should award correct points for a matching question if half of the matches are made correctly', function(done) {
		var selectedAnswers = [
			{
				answer: ["clue1:answer1", "clue2:answer2", "clue3:answer4", "clue4:answer3"]
			}
		];

		var correctAnswers = [
			["clue1:answer1", "clue2:answer2", "clue3:answer3", "clue4:answer4"]
		];	

		var pointsPerCorrectMatch = 5;
		
		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointsPerCorrectMatch]), pointsPerCorrectMatch * 2);
		done();
	});

	it('should award correct points for a matching question if only one match is made correctly', function(done) {
		var selectedAnswers = [
			{
				answer: ["clue1:answer1", "clue2:answer3", "clue3:answer4", "clue4:answer2"]
			}
		];

		var correctAnswers = [
			["clue1:answer1", "clue2:answer2", "clue3:answer3", "clue4:answer4"]
		];	

		var pointsPerCorrectMatch = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointsPerCorrectMatch]), pointsPerCorrectMatch * 1);
		done();
	});

	it('should zero points for a matching question if no correct matches are made', function(done) {
		var selectedAnswers = [
			{
				answer: ["clue1:answer2", "clue2:answer3", "clue3:answer4", "clue4:answer1"]
			}
		];

		var correctAnswers = [
			["clue1:answer1", "clue2:answer2", "clue3:answer3", "clue4:answer4"]
		];	

		var pointsPerCorrectMatch = 5;

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, [pointsPerCorrectMatch]), pointsPerCorrectMatch * 0);
		done();
	});	

	it('should award correct number of points for a quiz', function(done) {
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

		assert.equal(calculateQuizScore(selectedAnswers, correctAnswers, pointValues), 9);
		done();
	});
 });