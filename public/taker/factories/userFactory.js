app.factory("userFactory", ["$http", function($http){
	var self = this;
	var quizzes = {};

	self.getScoreOnQuiz = function(id, callback){
		if(quizzes[id.toString()]){
			callback(quizzes[id.toString()]);
		}else{
			$http.get("/api/userscore/" + id).success(function(data){
				callback(data);
			});
		}
	};

	return self;
}]);