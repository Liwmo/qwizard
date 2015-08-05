app.controller('finished-quiz', ['$scope', 'quizFactory', '$routeParams',  function($scope, quizFactory, $routeParams) {

    /*   */$scope.avgPoints;
    /* X */$scope.maxPoints;
    /* X */$scope.quizId = $routeParams.id;
    /* X */$scope.quiz;
    /* X */$scope.closeDate;
    /*   */$scope.openDate;
    /* X */$scope.numQuestions;
    /* X */$scope.quizTitle;
    /* X */$scope.totalEmployees;
    /*   */$scope.activeEmployees;
           $scope.percent; 
    // $scope.participation = $scope.activeEmployees/($scope.totalEmployees || 1);

    //This should not be using getLiveQuiz OR getQuizResults. Create and use new APIs for this to work right.
    
    quizFactory.getQuizResultDetail($scope.quizId, function(data) {
        function flipDate(date) {
            var flippedDate = date.substr(8, 2) + date.substr(4, 4).replace(/-/g, '/') + date.substr(0, 4);
            return flippedDate;
        }
        console.log(data);
    	$scope.quiz = data.quiz;
    	$scope.quizTitle = data.title;
        $scope.maxPoints = data.maxPoints;
        $scope.closeDate = flipDate(data.closeDate);
        $scope.openDate = flipDate(data.openDate);
    	$scope.numQuestions = $scope.quiz.questions.length;
        $scope.activeEmployees = data.employees;
        $scope.avgPoints = Math.round(data.avgPoints);
        if($scope.totalEmployees) {
            $scope.percent = Math.round(($scope.activeEmployees / $scope.totalEmployees)*100);
        }
    });


    quizFactory.getTotalEmployees(function(data) {
        $scope.totalEmployees = data[0].totalEmployees;
        if($scope.activeEmployees) {
            $scope.percent = Math.round(($scope.activeEmployees / $scope.totalEmployees)*100);
        }
    });
}]);
