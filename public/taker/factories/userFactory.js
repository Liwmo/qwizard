app.factory("userFactory", ["$http", function($http){
	var self = this;
	var quizzes = {};

	self.getScoreOnQuiz = function(quizId, callback){
		if(quizzes[quizId.toString()]){
			callback(quizzes[quizId.toString()]);
		}else{
			$http.get("/api/userscore/" + quizId).success(function(data){
				callback(data);
			});
		}
	};

	self.getUserRole = function(callback) {
		$http.get("/api/user/role").success(function(role){
			callback(role);
		});
	};

	self.getUserId = function(callback){
		$http.get("/api/user/id").success(function(data){
			callback(data.id);
		});
	};

	return self;
}]);