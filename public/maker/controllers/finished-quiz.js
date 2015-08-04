app.controller('finished-quiz', ['$scope', 'quizFactory', '$routeParams',  function($scope, quizFactory, $routeParams) {

    /*   */$scope.average;
    /* X */$scope.max;
    /* X */$scope.quizId = $routeParams.id;
    /* X */$scope.quiz;
    /* X */$scope.closeDate;
    /*   */$scope.openDate;
    /* X */$scope.numQuestions;
    /* X */$scope.quizTitle;
    /*   */$scope.totalEmployees;
    /*   */$scope.activeEmployees;
    /*   */$scope.participation;
    // $scope.participation = $scope.activeEmployees/($scope.totalEmployees || 1);
    
    quizFactory.getLiveQuiz($scope.quizId, function(data) {
    	$scope.quiz = data;
    	$scope.quizTitle = $scope.quiz.title;
    	console.log(data);
    	$scope.closeDate = $scope.quiz.closeDate
    									.substr(0, 10)
    									.replace(/-/g, '/');
    	$scope.numQuestions = $scope.quiz.questions.length;
    });

    quizFactory.getQuizResults($scope.quizId, function(data) {
    	$scope.max = JSON.parse(data.pointvalues)
    							.reduce(function(a, b) {
    								return a + b;
    							}, 0);
    });

}]);
