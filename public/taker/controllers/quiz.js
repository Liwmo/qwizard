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
        var selected = [];
        for(var i = 0; i < $scope.questions.length; i++){
            selected.push({
                answer: $scope.questions[i].selected,
                type: $scope.questions[i].type
            });
        }
        quizFactory.postQuiz("dummy_id", selected, function(data){
            notificationFactory.addNotification("Thanks for taking the WWT Employee Handbook quiz! Your scored " + data.score + " points!", "");
            $location.path('/');
        });
    };

    quizFactory.getQuiz("dummy_id", function(data){
        $scope.name = data.title;
        for(var i = 0; i < data.questions.length; i++){
            data.questions[i].selected = [];
        }
        $scope.questions = data.questions;//whole quiz
        //NOTE: this limits the quiz to 3 questions, one of each type
        $scope.questions = $scope.questions.slice(3, 10);//3 questions, mc, tf, ms
    });
}]);

