app.factory("leaderboardFactory", ["$http", function($http){
	var self = this;

	self.getLeaders = function(callback){
		$http.get("/api/leaderboard/").success(callback);
	};

	return self;
}]);