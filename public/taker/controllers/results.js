app.controller('results', ["$scope", "quizFactory", "userFactory", "$location", "$routeParams",
    function($scope, quizFactory, userFactory, $location, $routeParams) {
    $scope.name = "";
    $scope.currentQuestion = 0;
    $scope.points = 0;
    $scope.maxPoints = 0;
    $scope.quizId =  $scope.quizId  || $routeParams.id;
    $scope.ready = false;

    $scope.showAnswers = function() {
    	document.getElementById("results-prompt").classList.toggle("remove");
    	document.getElementById("results-answers").classList.toggle("remove");
    }
    
    quizFactory.getQuiz($scope.quizId, function(quizData){
        console.log(JSON.stringify(quizData));
        if(quizData.error) {
            $scope.error = quizData.error;
        }
        else {
            $scope.name = quizData.title;
            $scope.questions = quizData.questions;
            quizFactory.getQuizResults($scope.quizId, function(resultsData) {
                if(resultsData.error) {
                    $scope.error = resultsData.error;
                }
                else {
                    var answers = JSON.parse(resultsData.answers);
                    if (resultsData.selected) {
                        var selected = JSON.parse(resultsData.selected)
                    } else {
                        var selected = [];
                        for (var i = 0; i < $scope.questions.length; i++)
                        {
                            selected.push({answer: []})
                        }
                    }
                    var points =  JSON.parse(resultsData.pointvalues);
                    for (var i = 0; i < $scope.questions.length; i++) {
                          $scope.questions[i].selected = selected[i].answer;
                          $scope.questions[i].correct = answers[i];
                          $scope.questions[i].points = points[i];

                          if($scope.questions[i].type === 'ma') {
                            $scope.maxPoints += points[i]*4;
                          } else {
                            $scope.maxPoints += points[i]; 
                          }
                    }
                    if (resultsData.selected) {
                        userFactory.getScoreOnQuiz($scope.quizId, function(data) {
                            $scope.points = data.points;
                            $scope.ratio = $scope.points / $scope.maxPoints;
                            $scope.header = $scope.ratio > .5 ? "Congrats!" : "Uh oh!";
                            $scope.message = $scope.points + " out of " + $scope.maxPoints + " points earned on " + $scope.name + ($scope.ratio > .5 ? "!" : ". Better study more next time!");
                        });  
                    } else {
                        $scope.header = "You missed this quiz!";
                        $scope.message = "Take a look at the answers anyway. It could be useful later!";
                    }
                    $scope.ready = true;
                }
            });
        }
    });

    $scope.getResultsHeader = function(question) {
        var totalPoints = question.points;
        var partialPoints = 0;
        if(!$scope.ready) {
            return;
        }
        if(question.selected.length <= 0) {
            return "Not answered.";   
        }
        if(question.correct.toString() === question.selected.toString()) {
            if(question.type === 'ma'){
                totalPoints*=4;
            }
            return "Congrats! +" + totalPoints + " points!";
        } else {
            if(question.type === 'ma'){
                for(var i = 0; i < question.correct.length; i++){
                    if (question.correct[i] === question.selected[i]) {
                        partialPoints += question.points;
                    }
                }
                return "Incorrect. +" + partialPoints + " points.";
            }    
            return "Incorrect.";
        }
    };


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