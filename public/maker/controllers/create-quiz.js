app.controller('create-quiz', ['$scope', '$location', function($scope, $location) {

    $scope.validName = false;

    $scope.questions = [{points: 1, name: "", type: "", text: "", answers: []}, {points: 1, name: "", type: "", text: "", answers: []}];

    $scope.popupToggle = function() {
        document.querySelector('.popup').classList.toggle('visible');
    };

    $scope.toDashboard = function() {
    	$location.path('/');
    };

    $scope.verifyName = function() {
    	var pattern = new RegExp("^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9 _'-]*$");
    	console.log(pattern.test($scope.quizName));
        $scope.validName = pattern.test($scope.quizName);
    	return pattern.test($scope.quizName);
    };

    $scope.saveDraft = function() {
    	if (!$scope.verifyName()) {
    		console.log("I can't save this name");
    	}
    	else {
    		$scope.popupText = "Your draft is saved would you like to continue?"
	    	$scope.leftButton = "No, return to dashboard";
	    	$scope.rightButton = "Yes, I'm still workin'"
	    	console.log("Saving current draft");
	    	$scope.popupToggle();
    	}
    };

    $scope.publishQuiz = function() {
    	if (!$scope.verifyName()) {
    		console.log("I can't publish with this quiz name");
    	}
    	else {
    		console.log("Publishing the quiz to server");
    	}
    };

    $scope.cancelConfirm = function() {
    	$scope.popupText = "Unsaved changes will be thrown on the ground. Really cancel?"    	
    	$scope.leftButton = "Yes, just drop it";
    	$scope.rightButton = "No, I'm still workin'";
    	console.log("Confirm that cancellation");
    	$scope.popupToggle();
    };

    setInterval(function() {
        console.log(JSON.stringify($scope.questions[0]));
    }, 1000);

}]);