app.controller('results', ["$scope", "quizFactory", "userFactory", function($scope, quizFactory, userFactory) {
    $scope.name = "";
    $scope.currentQuestion = 0;
    $scope.points = 0;
    $scope.max_points = 71;//hard coded

    $scope.showAnswers = function() {
    	document.getElementById("results-prompt").classList.toggle("remove");
    	document.getElementById("results-answers").classList.toggle("remove");
    }
    

    quizFactory.getQuiz("dummy_id", function(data){
        $scope.name = data.title;
        $scope.questions = data.questions;
    });

    userFactory.getScoreOnQuiz("dummy_id", function(data) {
        $scope.points = data.points;
        $scope.ratio = $scope.points / $scope.max_points;
    });

}]);