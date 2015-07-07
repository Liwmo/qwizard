app.controller('create-quiz', ['$scope', '$location', function($scope, $location) {

	$scope.quizName = "Balogna";

    $scope.popupToggle = function() {
        document.querySelector('.popup').classList.toggle('visible');
    }

    $scope.toDashboard = function() {
    	$location.path('/');
    }

    $scope.verifyName = function() {
    	var pattern = new RegExp("^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9 _'-]*$");
    	console.log(pattern.test($scope.quizName));
    }

    $scope.sendName = function() {
    	console.log("Sending Name to server to validate Special Snowflakeness");
    }

    $scope.saveDraft = function() {
    	$scope.popupText = "Your draft is saved would you like to continue?"
    	$scope.leftButton = "No, return to dashboard";
    	$scope.rightButton = "Yes, I'm still workin'"
    	console.log("Saving current draft");
    	$scope.popupToggle();
    }

    $scope.cancelConfirm = function() {
    	$scope.popupText = "Unsaved changes will be thrown on the ground. Really cancel?"    	
    	$scope.leftButton = "Yes, just drop it";
    	$scope.rightButton = "No, I'm still workin'";
    	console.log("Confirm that cancellation");
    	$scope.popupToggle();
    }

}]);