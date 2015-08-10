app.controller('publish-quiz', ['$scope', '$routeParams', '$location', 'quizFactory',
 function($scope, $routeParams, $location, quizFactory) {

  var quiz;
  quizFactory.getMyQuiz($routeParams.id, function(data) {
    if(data.error) {
      console.log('you got an error: ', data.error);
    }

    quiz = data;
    $scope.quizId = quiz.id;
    $scope.quizName = quiz.title;
    $scope.published = quiz.publish != undefined;
  });
  // $scope.quizId = $routeParams.id;
  $scope.leftAction = $scope.hidePopOver;
  $scope.rightAction = $scope.hidePopOver;
  $scope.popupText = '';
  $scope.leftButton = '';
  $scope.rightButton = '';
  $scope.quizId = $routeParams.id;

  $scope.publish = function() {
    console.log($scope.startDate, $scope.endDate);
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

  $scope.toDashboard = function() {
      $location.path('/');
    };

  $scope.draft = function() {
    quizFactory.saveQuiz({
      id: $scope.quizId,
      publish: null,
      results: null
    }, function() {
      setPopup("Your quiz has been saved.  Would you like to continue?", {
          text: "No, return to dashboard",
          action: $scope.toDashboard
      }, {
          text: "Yes, I'm still working"
      });
    });
  };

 	var setPopup = function(text, left, right){
    if(!left) left = {};
    if(!right) right = {};
    $scope.leftAction = left.action || $scope.hidePopOver;
    $scope.rightAction = right.action || $scope.hidePopOver;
    $scope.popupText = text;
    $scope.leftButton = left.text || "";
    $scope.rightButton = right.text || "ok";
    $scope.showPopOver();
  };

  $scope.showPopOver = function(quizId) {
      document.querySelector(".overlay").classList.add("open");
      document.querySelector(".pop-over").classList.add("open");
  }

  $scope.hidePopOver = function() {
      document.querySelector(".overlay").classList.remove("open");
      document.querySelector(".pop-over").classList.remove("open");
  }

	$scope.verifyDateExistance = function() {
		if(!$scope.startDate) {
			return false;
		}
		if(!$scope.endDate) {
			return false;
		}
    if(!verifyDate($scope.startDate)){
      return false;
    }
    if(!verifyDate($scope.endDate)){
      return false;
    }
		return true;
	};

	$scope.verifyStart = function() {
		var selected = $scope.startDate;
		var today = (new Date()).toISOString().substr(0,10);
    console.log(selected);
		if(selected < today) {
			return false;	
		}
		return true;	
	};

	$scope.verifyEnd = function() {
		var selected = $scope.endDate;
		var start = $scope.startDate;
		if(selected <= start) {
			return false;	
		}
		return true;
	};

  var verifyDate = function(date){
    if(date instanceof Date){
      date = date.toISOString().substr(0,10);
    }
    var proper = date.match(/^\d{4}-\d{2}-\d{2}$/);
    var castable = !isNaN((new Date(date)).getTime());
    return proper && castable;
  };

  $scope.redirectToManagementPage = function() {
    $location.path('/');
  };
  
  var startDate = document.getElementsByName("start-date")[0];
  var endDate = document.getElementsByName("end-date")[0];
  if(startDate && endDate){
    startDate.onchange = endDate.onchange = function(){
      $scope.startDate = startDate.value;
      $scope.endDate = endDate.value;
    };
  }
}]);
