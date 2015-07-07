app.factory("leaderboardFactory", ["$http", function($http){
	var self = this;

	self.getLeaders = function(callback){
		$http.get("/api/leaderboard/").success(function(data){
			data.users.sort(function(a,b){return b.score - a.score});
			callback(data);
		});
	};

	return self;
}]);