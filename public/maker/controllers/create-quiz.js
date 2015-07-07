app.controller('create-quiz', ['$scope', function($scope) {

	$scope.quizName = "Balogna";

    $scope.popupCancel = function() {
        document.querySelector('.popup').classList.toggle('visible');
    }

    $scope.verifyName = function() {
    	var pattern = new RegExp("^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9 _'-]*$");
    	console.log(pattern.test($scope.quizName));
    }

    $scope.sendName = function() {
    	console.log("Sending Name to server to validate Special Snowflakeness");
    }

}]);