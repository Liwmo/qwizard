app.controller('quiz', ["$scope", "quizFactory", "notificationFactory", "$location", "$routeParams",
    function($scope, quizFactory, notificationFactory, $location, $routeParams) {

    $scope.name = "WWT Quiz";
    $scope.quizId= $routeParams.id;
    
    $scope.questions = [];

    $scope.currentQuestion = 0;

    $scope.next = function(){
    	$scope.currentQuestion++;
    };

    $scope.prev = function(){
    	$scope.currentQuestion--;
    };

    $scope.submit = function(){

    quizFactory.postQuiz($scope.quizId, function(data){
            notificationFactory.addNotification("Thanks for taking the " + $scope.name + " quiz! Your results will be available soon!", "#/");
            $location.path('/');
        });
    };

    quizFactory.getQuiz($scope.quizId, function(data){
        var today = new Date();
        if(new Date(data.closeDate) < today){
            $scope.error = "Quiz submission is closed";
            console.log("Quiz submission is closed");
        }else{
            $scope.name = data.title;
            $scope.questions = data.questions;
        }
    });
}]);

