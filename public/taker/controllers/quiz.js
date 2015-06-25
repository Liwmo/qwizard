app.controller('quiz', function($scope, $location) {
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

    $scope.submit = function() {
        $location.path('dashboard');
    }
});