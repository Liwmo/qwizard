app.controller('results', ["$scope", "quizFactory", function($scope, quizFactory) {
    $scope.name = "";
    $scope.currentQuestion = 0;



    quizFactory.getQuiz("dummy_id", function(data){
        $scope.name = data.title;
        $scope.questions = data.questions;
    });


}]);