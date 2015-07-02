app.controller('results', ["$scope", "quizFactory", "userFactory", "$location", function($scope, quizFactory, userFactory, $location) {
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
        quizFactory.getQuizResults(1, function(resultsData) {
            var answers = JSON.parse(resultsData.answers);
            var selected = JSON.parse(resultsData.selected);
            for (var i = 0; i < $scope.questions.length; i++) {
                  console.log("question " + (i+1) + ' has ' + selected[i].answer.length + ' selected answers');
                  $scope.questions[i].selected = selected[i].answer;
                  $scope.questions[i].correct = answers[i];
            }
        });
    });

    userFactory.getScoreOnQuiz(1, function(data) {
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