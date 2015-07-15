'use strict';

describe('publish quiz tests', function(){
	var $scope;
	var mockQuiz;
	var mockPath;
	var expectedQuiz;
	
	var start = new Date();
	var end = new Date();

	var quizPassedToSaveQuiz = {};

	var mockQuizFactory = {
		getQuiz: function(id, callback) {
			return {'title':  "Publish Quiz Test"};
		},
		saveQuiz: function(quiz, callback) {
			quizPassedToSaveQuiz = quiz;
		}
	};

	var mockLocation = {
		path: function(path){
			mockPath = path;
		}
	};

	beforeEach(module('app'));
	beforeEach(inject(function($rootScope, $controller, $routeParams){
		$routeParams.id = 999999;
		$scope = $rootScope.$new();
		$controller('publish-quiz', {
			$scope: $scope, 
			quizFactory: mockQuizFactory, 
			$location: mockLocation
		});

		spyOn(mockQuizFactory, "saveQuiz").and.callThrough();

		$scope.quizName = "Mock Publish Quiz";
		$scope.startDate = start;
		$scope.endDate = end;
	}));

	it('calls quizFactory.saveQuiz() and updates the start and end dates when publish() is called', inject(function($controller) {
		$scope.publish();

		expect(mockQuizFactory.saveQuiz).toHaveBeenCalled();
		expect(quizPassedToSaveQuiz.id).toBe(999999);
		expect(quizPassedToSaveQuiz.publish).toBe(start);
		expect(quizPassedToSaveQuiz.results).toBe(end);
	}));
});