app.controller('quiz', function($scope) {
    $scope.name = "WWT Quiz";
    
    $scope.questions = [
    	{text: "Question 1", answers: [], type: "tf", selected: null},
    	{text: "Question 2", answers: [], type: "tf", selected: null},
   		{text: "Question 3", answers: [], type: "tf", selected: null}
   	];

    $scope.currentQuestion = 0;

    $scope.next = function(){
    	$scope.currentQuestion++;
    };

    $scope.prev = function(){
    	$scope.currentQuestion--;
    };
});