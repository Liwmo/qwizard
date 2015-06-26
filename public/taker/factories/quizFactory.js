app.factory("quizFetcher", ["$http", function($http){
	var self = this;

	self.getQuiz = function(id, callback){
		$http.get("/api/quiz/" + id).success(callback);
	};

	self.postQuiz = function(id, answers, callback){
		$http.post("/api/quiz/" + id, answers).success(callback);
	};

	return self;
}]);