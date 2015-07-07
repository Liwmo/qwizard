app.controller('manager', ["$scope", function($scope){
	$scope.selectedCategory = "finished";



	$scope.selectCategory = function(id) {
		$scope.selectedCategory = id;
	};
}]);