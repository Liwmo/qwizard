app.controller('myQuizzes', ['$scope', 'quizFactory', function($scope, quizFactory) {
	$scope.live = [];

    quizFactory.getLiveQuizzes(function(data){
    	$scope.live = data;
    });

    $scope.getTimeLeft = function(date){
    	date = new Date(date);
    	var now = new Date();
    	var diff = Math.floor((date.getTime() - now.getTime()) / 60000);//minutes until done
    	var days = Math.floor(diff / (24 * 60));
    	var hours = Math.floor((diff - (days * 24 * 60)) / 60);
    	var minutes = diff - ((days * 24) + hours) * 60;
    	return days + "d " + hours + "h " + minutes + "m";
    };
}]);