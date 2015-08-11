app.factory("userFactory", ["$http", function($http){
	var self = this;
	var quizzes = {};
	var user = {};

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
		if (!user.role) {
			$http.get("/api/user/role").success(function(role){
				user.role = role;
				callback(role);
			});
		}
		else
			callback(user.role);
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
				user.stats = data;
				user.stats.avgScore = Math.round(user.stats.avgScore * 100);
				callback(user.stats);
			});
		}
		else {
			callback(user.stats);
		}
	};

	self.getUserName = function(callback) {
		if (!user.name) {
			$http.get("/api/user/name").success(function(data) {
				user.name = data;
				callback(user.name);
			});
		}
		else
			callback(user.name);
	}

	return self;
}]);