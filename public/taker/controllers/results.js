app.controller('results', ["$scope", "quizFactory", "userFactory", "$location", "$routeParams",
    function($scope, quizFactory, userFactory, $location, $routeParams) {
    $scope.name = "";
    $scope.currentQuestion = 0;
    $scope.points = 0;
    $scope.max_points = 71;//hard coded
    $scope.quizId =  $scope.quizId  || $routeParams.id;

    $scope.showAnswers = function() {
    	document.getElementById("results-prompt").classList.toggle("remove");
    	document.getElementById("results-answers").classList.toggle("remove");
    }
    
    quizFactory.getQuiz($scope.quizId, function(quizData){
        if(quizData.error) {
            $scope.error = quizData.error;
        }
        else {
            $scope.name = quizData.title;
            $scope.questions = quizData.questions;
            quizFactory.getQuizResults($scope.quizId, function(resultsData) {
                var answers = JSON.parse(resultsData.answers);
                var selected = JSON.parse(resultsData.selected);
                for (var i = 0; i < $scope.questions.length; i++) {
                      console.log("question " + (i+1) + ' has ' + selected[i].answer.length + ' selected answers');
                      $scope.questions[i].selected = selected[i].answer;
                      $scope.questions[i].correct = answers[i];
                }
            });
        }
    });

    userFactory.getScoreOnQuiz($scope.quizId, function(data) {
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