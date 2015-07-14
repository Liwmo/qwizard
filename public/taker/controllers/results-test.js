'use strict';

describe('Results Controller Tests', function(){
	var $scope;

	var mockQuiz = {
		error: "There was an error getting the quiz" + Math.random()
	};
	var mockResults = {};

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

	it('')
});