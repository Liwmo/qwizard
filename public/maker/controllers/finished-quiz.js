app.controller('finished-quiz', ['$scope', 'quizFactory', '$routeParams',  function($scope, quizFactory, $routeParams) {

    $scope.avgPoints;
    $scope.maxPoints;
    $scope.quizId = $routeParams.id;
    $scope.quiz;
    $scope.closeDate;
    $scope.openDate;
    $scope.numQuestions;
    $scope.quizTitle;
    $scope.totalEmployees;
    $scope.activeEmployees;
    $scope.percent; 

    quizFactory.getQuizResultDetail($scope.quizId, function(data) {
        function flipDate(date) {
            var flippedDate = date.substr(5, 2) + "/" + date.substr(8, 2) + "/" + date.substr(0, 4);
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
