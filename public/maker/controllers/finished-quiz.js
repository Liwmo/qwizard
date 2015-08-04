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

    //This should not be using getLiveQuiz OR getQuizResults. Create and use new APIs for this to work right.
    
    quizFactory.getLiveQuiz($scope.quizId, function(data) {
        function flipDate(date) {
            var flippedDate = date.substr(8, 2) + date.substr(4, 4).replace(/-/g, '/') + date.substr(0, 4);
            return flippedDate;
        }
    	$scope.quiz = data;
    	$scope.quizTitle = $scope.quiz.title;
    	console.log(data);
        
        $scope.closeDate = flipDate($scope.quiz.closeDate);
        $scope.openDate = flipDate($scope.quiz.openDate);
    	$scope.numQuestions = $scope.quiz.questions.length;
    });

    quizFactory.getQuizResults($scope.quizId, function(data) {
    	$scope.max = JSON.parse(data.pointvalues)
    							.reduce(function(a, b) {
    								return a + b;
    							}, 0);
    });

}]);
