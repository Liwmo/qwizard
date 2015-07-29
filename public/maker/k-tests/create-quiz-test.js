'use strict';

describe('create quiz tests', function(){
	var $scope;
	var mockQuiz;
	var mockPath;

	var mockQuizFactory = {
		saveQuiz: function(quiz, callback){
			mockQuiz = quiz;
			callback(123456789);
		}
	};

	var mockLocation = {
		path: function(path){
			mockPath = path;
		}
	};

	beforeEach(module('app'));
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();
		$controller('create-quiz', {
			$scope: $scope, 
			quizFactory: mockQuizFactory, 
			$location: mockLocation
		});
		mockQuiz = {};
		$scope.quizName = "Mock Quiz";
		$scope.questions = [{}];
		$scope.questions[0].name = "Mock Name";
		$scope.questions[0].text = "Mock Text";
		$scope.questions[0].type = "mc";
		$scope.questions[0].correctAnswer = [0];
		$scope.questions[0].answers = ["answer1", "b", "c"];
	}));

	it('saveDraft - should send quiz to quizFactory for it to be saved', inject(function($controller){
		$scope.saveDraft();
		expect(mockQuiz.questions[0].text).toBe("Mock Text");
	}));

	it('saveDraft - should use quiz id passed back from first call in other calls', inject(function($controller){
		$scope.saveDraft();
		$scope.saveDraft();
		expect(mockQuiz.id).toBe(123456789);
	}));

	it('publishQuiz - should send quiz to quizFactory to be saved', inject(function($controller){
		$scope.publishQuiz();
		expect(mockQuiz.questions[0].text).toBe("Mock Text");
	}));

	it('publishQuiz - should redirect to publish page', inject(function($controller){
		$scope.publishQuiz();
		expect(mockPath).toBe("/publish/123456789");
	}));
});