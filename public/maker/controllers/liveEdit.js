app.controller('liveEdit', ['$scope', '$location', 'quizFactory', '$routeParams', function($scope, $location, quizFactory, $routeParams) {
    var quizId;//should be overwritten

    $scope.validName = true;
    $scope.quizName = "";
    $scope.questions = [];
    $scope.matchingArrays = [];

    $scope.leftAction = $scope.popupToggle;
    $scope.rightAction = $scope.popupToggle;

    $scope.popupToggle = function() {
        try{
            document.querySelector('.popup').classList.toggle('visible');
        }catch(e){
            console.log('no popup to show: ' + $scope.popupText);
        }
    };

    $scope.verifyName = function() {
    	var pattern = new RegExp("^[A-Za-z0-9_]*[A-Za-z0-9][A-Za-z0-9 _'-]*$");
    	$scope.validName = pattern.test($scope.quizName);
    	return pattern.test($scope.quizName);
    };

    $scope.saveChanges = function() {
    	if (!$scope.verifyName()) {
    		setPopup("Cannot publish with this quiz name.");
            return;
    	}
        if (!$scope.questions.length) {
            setPopup("Cannot publish an empty quiz.");
            return;
        }
        else {
    		for(var i = 0; i < $scope.questions.length; i++){
                if(!$scope.questions[i].type){
                    setPopup("Question "+(i+1)+" does not have a type selected.");
                    return;
                }
                if(!$scope.questions[i].text){
                    setPopup("Question "+(i+1)+" does not have any question text.");
                    return;
                }
                if ($scope.questions[i].text.length > 300) {
                    setPopup("Question text cannot exceed 300 characters.");
                    return;
                }
                if(!$scope.questions[i].text){
                    setPopup("Cannot publish with empty question fields.");
                    return;
                }
                if($scope.questions[i].correctAnswer.length <= 0) {
                    setPopup("Question "+(i+1)+" does not have an answer selected.");
                    return;
                }
                if ($scope.questions[i].type != 'tf') {
                    for(var j = 0; j < $scope.questions[i].answers.length; j++) {
                        if ($scope.questions[i].answers[j].length === 0) {
                            setPopup("On Question "+(i+1)+", an answer does not have any text.");
                            return;
                        }
                    }
                }
                if ($scope.questions[i].type == 'ma') {
                    for (var j = 0; j < $scope.questions[i].answers.length; j++) {
                        var pair = $scope.questions[i].answers[j].split(':');
                        if (pair[0].length <= 0 || pair[1].length <= 0) {
                            setPopup("On Question "+(i+1)+", an answer does not have any text.");
                            return;
                        }
                    }
                }
            }
            quizFactory.saveQuiz({
                title: $scope.quizName,
                questions: $scope.questions,
                id: quizId
            }, function(data){
                if(data.error){
                    setPopup("There was an error publishing your quiz.");
                }else{
                    $location.path('/');
                }
            });
    	}
    };

    var setPopup = function(text, left, right){
        if(!left) left = {};
        if(!right) right = {};
        $scope.leftAction = left.action || $scope.popupToggle;
        $scope.rightAction = right.action || $scope.popupToggle;
        $scope.popupText = text;
        $scope.leftButton = left.text || "ok";
        $scope.rightButton = right.text || "";
        $scope.popupToggle();
    };

    $scope.cancelConfirm = function() {
        setPopup("unsaved changes will be discarded. Really cancel?",{
            text: "yes",
            action: $scope.toDashboard
        },{
            text: "no",
        });
    };

    if ($routeParams.id) {
        quizFactory.getMyQuiz($routeParams.id, function(data) {
            if(data.error){
                $location.path('/create');
            }else{
                quizId = data.id;
                $scope.questions = data.questions;
                $scope.quizName = data.title;
                $scope.matchingArrays.push({
                    clues: [],
                    answers: []
                });
            }
        });
    }
}]);