app.controller('results', ["$scope", "quizFactory", function($scope, quizFactory) {
    $scope.name = "";
    $scope.currentQuestion = 0;
    $scope.points = 10;
    $scope.max_points = 30;
    

    quizFactory.getQuiz("dummy_id", function(data){
        $scope.name = data.title;
        $scope.questions = data.questions;

        $scope.ratio = $scope.points / $scope.max_points;
    	$scope.title = ($scope.ratio > .5 ? "Congrats!" : "Uh oh!");

        $scope.message = $scope.points + " points earned on " + $scope.name;
    	$scope.message += ($scope.ratio > .5 ? "!" : ".");
    	$scope.message += ($scope.ratio > .5 ? "" : "Better study more next time!");
    });


}]);