app.factory("quizFetcher", ["$http", function($http){
	var self = this;

	self.getQuiz = function(id, callback){
		$http.get("/taker/mockData.json").success(callback);
	};

	return self;
}]);