app.controller('create-quiz', ['$scope', '$location', 'quizFactory', function($scope, $location, quizFactory) {
    var quizId;//should be overwritten

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
            answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
            correctAnswer: [0]
        });
    };

    $scope.removeQuestion = function(index){
        console.log("removing question " + index);
        $scope.questions.splice(index, 1);
    };

    $scope.popupToggle = function() {
        try{
            document.querySelector('.popup').classList.toggle('visible');
        }catch(e){
            console.log('no popup to show');
        }
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
    	}else{
            quizFactory.saveQuiz({
                title: $scope.quizName,
                questions: $scope.questions,
                id: quizId
                }, function(id){
                quizId = quizId || id;
                setPopup("Your draft is saved.  Would you like to continue?", {
                    text: "No, return to dashboard",
                    action: $scope.toDashboard
                }, {
                    text: "Yes, I'm still working"
                });
            });
    	}
    };

    $scope.publishQuiz = function() {
    	if (!$scope.verifyName()) {
    		setPopup("Cannot publish with this quiz name.");
            return;
    	}
        if (!$scope.questions.length) {
            setPopup("Cannot publish an empty quiz.");
            return;
        }else{
    		for(var i = 0; i < $scope.questions.length; i++){
                if(!$scope.questions[i].type){
                    setPopup("Cannot publish a quiz with undefined question types.");
                    return;
                }
                if(!$scope.questions[i].text){
                    setPopup("Cannot publish with empty question fields.");
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
            text: "No, I'm still working",
        });
    };

    $scope.addQuestion();
    // setInterval(function() {
    //     console.log(JSON.stringify($scope.questions));
    // }, 1000);

}]);