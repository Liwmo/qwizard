app.controller('results', ["$scope", "quizFactory", "userFactory", function($scope, quizFactory, userFactory) {
    $scope.name = "";
    $scope.currentQuestion = 0;
    $scope.points = 0;
    $scope.max_points = 71;//hard coded

    $scope.showAnswers = function() {
    	document.getElementById("results-prompt").classList.toggle("remove");
    	document.getElementById("results-answers").classList.toggle("remove");
    }
    

    quizFactory.getQuiz(1, function(quizData){
        $scope.name = quizData.title;
        $scope.questions = quizData.questions;
        quizFactory.getQuizResults(1, 9001, function(resultsData) {
            var answers = JSON.parse(resultsData.answers);
            var selected = JSON.parse(resultsData.selected);

            for (var i = 0; i < $scope.questions.length; i++) {
               for (var j = 0; j < $scope.questions[i].selected.length; j++) {
                  $scope.questions[i].selected = selected[i].answer;
               } 
            }
        });
    });

    userFactory.getScoreOnQuiz("dummy_id", function(data) {
        $scope.points = data.points;
        $scope.ratio = $scope.points / $scope.max_points;
    });

    $scope.next = function(){
        $scope.currentQuestion++;
    };

    $scope.prev = function(){
        $scope.currentQuestion--;
    };

    $scope.finish = function(){
        $location.path('/'); 
    };

}]);