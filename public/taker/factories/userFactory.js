app.factory("userFactory", ["$http", function($http){
	var self = this;
	var quizzes = {};
	var user;

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
		if (!user.id) {
			$http.get("/api/user/id").success(function(data){
				user.id = data.id;
				callback(data.id);
			});
		}
		else {
			callback(user.id);
		}
	};

	self.getUserStats = function(callback){
		if (!user.stats) {
			$http.get("/api/user/stats").success(function(data){
				user.stats = data.stats;
				callback(data.stats);
			});
		}
		else {
			callback(user.stats);
		}
	};

	return self;
}]);