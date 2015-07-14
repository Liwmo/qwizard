app.controller('publish-quiz', ['$scope', '$routeParams', 'makerQuizFactory',
 function($scope, $routeParams, makerQuizFactory) {

  makerQuizFactory.getQuiz($routeParams.id);
  //TODO: QuizName should be grabbed using a factory
  $scope.quizName = makerQuizFactory.currentQuiz.name;
  $scope.leftAction = $scope.popupToggle;
  $scope.rightAction = $scope.popupToggle;

  $scope.publish = function() {
  	if (!$scope.verifyDateExistance()) {
  		setPopup("Must set a publish date.");
      return;
  	}
  	if (!$scope.verifyStart()) {
  		setPopup("Cannot publish quiz in the past.");
      return;
  	}
  	if (!$scope.verifyEnd()) {
  		setPopup("Cannot end quiz before it starts.");
      return;
  	}
  }

 	var setPopup = function(text, left, right){
    if(!left) left = {};
    if(!right) right = {};
    $scope.leftAction = left.action || $scope.popupToggle;
    $scope.rightAction = right.action || $scope.popupToggle;
    $scope.popupText = text;
    $scope.leftButton = left.text || "OK";
    $scope.rightButton = right.text || "";
    $scope.popupToggle();
  };

  $scope.popupToggle = function() {
    document.querySelector('.popup').classList.toggle('visible');
  };  

	$scope.verifyDateExistance = function() {
		if(!$scope.startDate) {
			return false;
		}
		if(!$scope.endDate) {
			return false;
		}
		return true;
	};

	$scope.verifyStart = function() {
		var selected = $scope.startDate;
		var today = new Date();
		selected.setHours(0,0,0,0);
		today.setHours(0,0,0,0);
		if(selected < today) {
			return false;	
		}
		return true;	
	};

	$scope.verifyEnd = function() {
		var selected = $scope.endDate;
		var start = $scope.startDate;
		selected.setHours(0,0,0,0);
		start.setHours(0,0,0,0);
		if(selected < start) {
			return false;	
		}
		return true;
	};

}]);
