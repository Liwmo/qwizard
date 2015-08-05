app.controller('manager', ["$scope", "quizFactory", function($scope, quizFactory){
	$scope.selectedCategory = "live";
	$scope.finished = [];
    $scope.scheduled = [];
    $scope.drafts = [];

	quizFactory.getFinishedQuizzes(function(data){
        $scope.finished = data;
    });

    quizFactory.getScheduledQuizzes(function(data){
        $scope.scheduled = data;
    });

    quizFactory.getTotalEmployees(function(data) {
    	$scope.totalEmployees = data[0].totalEmployees;
    });

    quizFactory.getDraftQuizzes(function(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].questions = JSON.parse(data[i].questions);
        }
        $scope.drafts = data;

    });

    $scope.calcPercent = function(num, den){
    	var data = Math.round((num/den)*100);
    	return data;
    };

	$scope.selectCategory = function(id) {
		$scope.selectedCategory = id;
	};

	$scope.getTimeLeft = function(date){
    	date = new Date(date);
    	var now = new Date();
    	var diff = Math.floor((date.getTime() - now.getTime()) / 60000);//minutes until done
    	var days = Math.floor(diff / (24 * 60));
    	var hours = Math.floor((diff - (days * 24 * 60)) / 60);
    	var minutes = diff - ((days * 24) + hours) * 60;
    	return days + "d " + hours + "h " + minutes + "m";
    };

    $scope.getDateRange = function(start, end){
        var months = ["January", "February", "March", "April", "May", "June", "July",
                      "August", "September", "October", "November", "December"];

        start = new Date(start);
        end = new Date(end);

        return months[start.getMonth()] + " " + start.getDate() + " - " + 
               months[end.getMonth()] + " " + end.getDate();
    };
}]);