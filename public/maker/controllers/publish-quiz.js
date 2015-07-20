app.controller('publish-quiz', ['$scope', '$routeParams', '$location', 'quizFactory',
 function($scope, $routeParams, $location, quizFactory) {

  var quiz;
  quizFactory.getQuiz($routeParams.id, function(data) {
    quiz = data;
    $scope.quizId = quiz.id;
    $scope.quizName = quiz.title;
  });
  // $scope.quizId = $routeParams.id;
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
    quizFactory.saveQuiz({
      id: $scope.quizId,
      publish: $scope.startDate,
      results: $scope.endDate
    }, function() {
        $scope.redirectToManagementPage();
    });
  };

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
    try{
        document.querySelector('.popup').classList.toggle('visible');
    }catch(e){
        console.log('no popup to show: ' + $scope.popupText);
    }
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

  $scope.redirectToManagementPage = function() {
    $location.path('/');
  };

  var startDate = document.getElementsByName("start-date")[0];
  var endDate = document.getElementsByName("end-date")[0];
  if(startDate && endDate){
    startDate.onchange = endDate.onchange = function(){
        $scope.startDate = new Date(startDate.value);
        $scope.endDate = new Date(endDate.value);
    };
  }
}]);
