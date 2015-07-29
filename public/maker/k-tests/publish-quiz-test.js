'use strict';

describe('publish quiz tests', function(){
	var $scope;
	var mockQuiz;
	var mockPath;
	var expectedQuiz;
	
	var start = new Date();
	var end = new Date();
	start.setDate(start.getDate() + 1);
	end.setDate(end.getDate() + 7);

	var quizPassedToSaveQuiz = {};

	var mockQuizFactory = {
		getQuiz: function(id, callback) {
			callback({title:  "Publish Quiz Test", id: 999999});
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
		console.log(start);
		console.log(end);

		expect(mockQuizFactory.saveQuiz).toHaveBeenCalled();


		expect(quizPassedToSaveQuiz.id).toBe(999999);
		expect(quizPassedToSaveQuiz.publish).toBe(start);
		expect(quizPassedToSaveQuiz.results).toBe(end);
	}));
});