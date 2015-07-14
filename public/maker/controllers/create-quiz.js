app.controller('create-quiz', ['$scope', '$location', function($scope, $location) {

    $scope.validName = true;
    $scope.quizName = "";
    $scope.questions = [];

    $scope.leftAction = $scope.popupToggle;
    $scope.rightAction = $scope.popupToggle;

    $scope.addQuestion = function(){
        $scope.questions.push({
            points: 1,
            name: "",
            type: "",
            text: "",
            answers: ["", "", ""],
            correctAnswer: [0],
            max: 6
        });
    };

    $scope.removeQuestion = function(index){
        console.log("removing question " + index);
        $scope.questions.splice(index, 1);
    };

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
    		$scope.popupText = "Your draft is saved. Would you like to continue?";
	    	$scope.leftButton = "No, return to dashboard";
	    	$scope.rightButton = "Yes, I'm still workin'";
	    	console.log("Saving current draft");
	    	$scope.popupToggle();
    	}
    };

    $scope.publishQuiz = function() {
    	if (!$scope.verifyName()) {
    		setPopup("Cannot publish with this quiz name.");
            return;
    	}
        if (!$scope.questions.length) {
            setPopup("Cannot publish an empy quiz.");
            return;
        }else{
            var numberOfQuestions = $scope.questions.length;
    		for(var i = 0; i < numberOfQuestions; i++){
                var question = $scope.questions[i];
                if(!question.type){
                    setPopup("Question "+(i+1)+" does not have a type selected.");
                    return;
                }
                if(!question.text){
                    setPopup("Question "+(i+1)+" does not have any question text.");
                    return;
                }
                if(question.correctAnswer.length <= 0) {
                    setPopup("Question "+(i+1)+" does not have an answer selected.");
                    return;
                }

                for(var j = 0; j < question.answers.length; j++)
                    if (question.answers[j].length === 0) {
                        setPopup("On Question "+(i+1)+", an answer does not have any text.");
                        return;
                    }
            }
    	}
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

    $scope.cancelConfirm = function() {
        setPopup("Unsaved changes will be thrown on the ground. Really cancel?",{
            text: "Yes, just drop it",
            action: $scope.toDashboard
        },{
            text: "No, I'm still workin'",
        });
    };

    $scope.addQuestion();
    // setInterval(function() {
    //     console.log(JSON.stringify($scope.questions));
    // }, 1000);

}]);