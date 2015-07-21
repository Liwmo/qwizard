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

                          $scope.maxPoints += points[i];
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
    
    // NOTE: It seems that question.correct or question.selected is undefined somewhere!!!!
    $scope.getResultsHeader = function(question) {
        if(!$scope.ready) {
            return;
        }
            
        if(question.correct.toString() === question.selected.toString()) {
            return "Congrats! +" + question.points + " points!";
        } else {
            return "Incorrect";
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