app.factory("leaderboardFactory", ["$http", function($http){
	var self = this;

	self.getLeaders = function(callback){
		$http.get("/api/leaderboard/").success(function(data){
			if (!data.error && data.users) {
				data.users.sort(function(a,b){return b.score - a.score});
			}

			callback(data);
		});
	};

	self.getLeadersSinceDate = function(date, callback){
		var dateStr = date.toISOString().substr(0,10);
		$http.get("/api/leaderboard/since/" + dateStr).success(function(data){
			if (!data.error && data.users) {
				data.users.sort(function(a,b){return b.score - a.score});
			}
			callback(data);
		});
	};

	self.getMonthly = function(callback){
		var date = new Date();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		var dateStr =  year + '-' + month;
		date = new Date(dateStr);
		self.getLeadersSinceDate(date, callback);
	}

	self.getWeekly = function(callback){
		var date = new Date();
		date.setDate(date.getDate() - 7);
		console.log(date);
		self.getLeadersSinceDate(date, callback);
	}

	return self;
}]);