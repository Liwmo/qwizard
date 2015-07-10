app.controller('manager', ["$scope", function($scope){
	$scope.selectedCategory = 1;

	$scope.selectCategory = function(id) {
		$scope.selectedCategory = id;
		console.log("Clicked Category: " + id);
	};
}]);