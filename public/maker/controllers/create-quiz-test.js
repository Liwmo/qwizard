'use strict';

describe('create quiz tests', function(){
	var $scope;
	var mockQuiz;

	var mockQuizFactory = {
		saveQuiz: function(quiz, callback){
			mockQuiz = quiz;
			callback(123456789);
		}
	};

	beforeEach(module('app'));
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();
		$controller('create-quiz', {$scope: $scope, quizFactory: mockQuizFactory});
		$scope.quizName = "Mock Quiz";
		$scope.questions[0].name = "Mock Name";
		$scope.questions[0].text = "Mock Text";
		$scope.questions[0].type = "mc";
	}));

	it('should send quiz to quizFactory for it to be saved', inject(function($controller){
		$scope.saveDraft();
		expect(mockQuiz.questions[0].text).toBe("Mock Text");
	}));

	it('should use quiz id passed back from first call in other calls', inject(function($controller){
		$scope.saveDraft();
		$scope.saveDraft();
		expect(mockQuiz.id).toBe(123456789);
	}));
});