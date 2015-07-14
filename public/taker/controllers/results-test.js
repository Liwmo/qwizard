'use strict';

describe('Results Controller Tests', function(){
	var $scope;

	var mockQuiz = {
		error: "There was an error getting the quiz" + Math.random()
	};
	var mockResults = {
		error: "There was an error getting the quiz results" + Math.random()
	};

	var mockQuizFactory = {
		getQuiz: function(id, callback){
			callback(mockQuiz);
		},
		getQuizResults: function(id, callback){
			callback(mockResults);
		}
	};

	beforeEach(module('app'));
	beforeEach(inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$scope.quizId = 2;
		$controller('results', {$scope: $scope, quizFactory: mockQuizFactory});
	}));

	it('should reject quiz data when there is an error', inject(function($controller){
		expect($scope.error).toBe(mockQuiz.error);
	}));

	it('setting mockQuiz to proper quiz', function(){
		mockQuiz = {
			title: "Mock Title",
			questions: [{
				type: 'mc',
				text: 'Mock Question',
				name: 'Mock',
				answers: ["Mock 1", "Mock 2", "Mock 3"]
			}]
		};
	});

	it('should reject quiz results data when there is an error', inject(function($controller){
		expect($scope.error).toBe(mockResults.error);
	}));

	it('setting mockResults to proper results', function(){
		mockResults = {
			answers: JSON.stringify([[2]]),
			selected: JSON.stringify([{answer: [1]}])
		};
	});

	it('should have the correct quizData', inject(function($controller) {
		expect($scope.name).toBe(mockQuiz.title);
		expect($scope.questions.length).toBe(mockQuiz.questions.length);
	}));

	it('should have the correct resultsData', inject(function($controller) {
		expect($scope.questions[0].selected[0]).toBe(JSON.parse(mockResults.selected)[0].answer[0]);
		expect($scope.questions[0].correct[0]).toBe(JSON.parse(mockResults.answers)[0][0]);
	}));
});