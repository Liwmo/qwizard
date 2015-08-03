app.controller('manager', ["$scope", "quizFactory", function($scope, quizFactory){
	$scope.selectedCategory = "live";
	$scope.finished = [];

	quizFactory.getFinishedQuizzes(function(data){
        $scope.finished = data;
    });

	$scope.selectCategory = function(id) {
		$scope.selectedCategory = id;
		console.log("Clicked Category: " + id);
	};
}]);