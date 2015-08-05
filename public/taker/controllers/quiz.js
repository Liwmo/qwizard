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
            notificationFactory.removeNotification($routeParams, function() {
                notificationFactory.addNotification("Thanks for taking the " + $scope.name + " quiz! Your results will be available soon!", "#/");
                $location.path('/');
            });
        });
    };

    quizFactory.getLiveQuiz($scope.quizId, function(data){
        var today = new Date();
        console.log(data.closeDate);
        if(new Date(data.closeDate) < today){
            $scope.error = "Quiz submission is closed";
            console.log("redirecting to: " + '/results/' + $scope.quizId);
            $location.path('/results/' + $scope.quizId);
        }else{
            $scope.name = data.title;
            $scope.questions = data.questions;
        }
    });
    //listener for link being clicked to redirect to new window rather than direct navigation
    var quizView = document.getElementById('quizView');
    if(quizView){
        quizView.addEventListener('click', function(e){
            if(e.target.tagName == "A"){
                window.open(e.target.href);
                e.preventDefault();
            }else if(e.target.matches("[ng-bind-html] a *")){
                var a = e.target.parentElement;
                while(a.tagName !== "A"){
                    a = a.parentElement;
                }
                window.open(a.href);
                e.preventDefault();
            }
        }, true);
    }
}]);

