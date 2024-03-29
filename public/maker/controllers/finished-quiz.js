app.controller('finished-quiz', ['$scope', 'quizFactory', '$routeParams',  function($scope, quizFactory, $routeParams) {

    $scope.avgPoints;
    $scope.maxPoints;
    $scope.quizId = $routeParams.id;
    $scope.questions;
    $scope.closeDate;
    $scope.openDate;
    $scope.numQuestions;
    $scope.quizTitle;
    $scope.possibleTakerCount;
    $scope.activeEmployees;
    $scope.percent; 

    $scope.questions = [{
        category: 'MC',
        quizType: 'Multiple Choice',
        questionText: 'Who are you?',
        points: 2,
    }];

    quizFactory.getQuizResultDetail($scope.quizId, function(data) {
        function flipDate(date) {
            var flippedDate = date.substr(5, 2) + "/" + date.substr(8, 2) + "/" + date.substr(0, 4);
            return flippedDate;
        }
    	$scope.questions = data.questions;
    	$scope.quizTitle = data.title;
        $scope.maxPoints = data.maxPoints;
        $scope.closeDate = flipDate(data.closeDate);
        $scope.openDate = flipDate(data.openDate);
    	$scope.numQuestions = $scope.questions.length;
        $scope.activeEmployees = data.employees;
        $scope.avgPoints = Math.round(data.avgPoints);
        $scope.possibleTakerCount = data.possibleTakerCount;
        $scope.percent = Math.round(($scope.activeEmployees / $scope.possibleTakerCount)*100);

        quizFactory.getAllAnswersForAQuiz($scope.quizId, $scope.questions, function(data){
            for(var i = 0; i < $scope.questions.length; i++){
                $scope.questions[i].responses = data[i] || [0,0,0,0,0,0];
            }
            console.log(data);
            console.log($scope.questions);
        });
    });
}]);
