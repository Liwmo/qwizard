app.controller('manager', ["$scope", function($scope){
	$scope.selectedCategory = "live";

	$scope.selectCategory = function(id) {
		$scope.selectedCategory = id;
		console.log("Clicked Category: " + id);
	};
}]);