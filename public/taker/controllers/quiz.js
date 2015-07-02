app.controller('quiz', ["$scope", "quizFactory", "notificationFactory", "$location", function($scope, quizFactory, notificationFactory, $location) {

    $scope.name = "WWT Quiz";
    
    $scope.questions = [
    	{name: "Apple Pie", text: "Question 1 is this one?!", answers: ["pizza", "sushi", "taco"], type: "mc", selected: null},
    	{name: "Banana Bread", text: "Question 2", answers: [], type: "tf", selected: null},
   		{name: "Creamsicle", text: "Question 3", answers: [], type: "tf", selected: null},
        {name: "Danish", text: "Question 4", answers: ["bill", "bill", "hail", "Bill", "BILL!"], type: "mc", selected: null}
   	];

    $scope.currentQuestion = 0;

    $scope.next = function(){
    	$scope.currentQuestion++;
    };

    $scope.prev = function(){
    	$scope.currentQuestion--;
    };

    $scope.submit = function(){

    document.getElementById("quizView").addEventListener("keypress", function(e){
        console.log(e.keyCode);
    });

    // TODO: first param needs to be quiz ID from url params
    quizFactory.postQuiz(1, function(data){
            notificationFactory.addNotification("Thanks for taking the WWT Employee Handbook quiz! Your results will be available soon!", "#/");
            $location.path('/');
        });
    };

    // TODO: first param needs to be quiz ID from url params
    quizFactory.getQuiz(1, function(data){
        console.log('data: ', data);
        $scope.name = data.title;
        $scope.questions = data.questions;
    });
}]);

