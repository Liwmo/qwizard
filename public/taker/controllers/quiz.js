app.controller('quiz', function($scope) {
    $scope.name = "WWT Quiz";
    
    $scope.questions = [
    	{name: "Apple Pie", text: "Question 1 is this one?!", answers: [], type: "tf", selected: null},
    	{name: "Banana Bread", text: "Question 2", answers: [], type: "tf", selected: null},
   		{name: "Creamsicle", text: "Question 3", answers: [], type: "tf", selected: null}
   	];

    $scope.currentQuestion = 0;

    $scope.next = function(){
    	$scope.currentQuestion++;
    };

    $scope.prev = function(){
    	$scope.currentQuestion--;
    };
});