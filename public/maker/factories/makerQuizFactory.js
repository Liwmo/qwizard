app.factory("makerQuizFactory", ["$http", function($http){
	var self = this;
	self.currentQuiz = {};

	self.getQuiz = function(id) {
		//TODO: Hit API endpoint to get the quiz
		self.currentQuiz.name = "WWT Handbook";
	};

	return self;
}]);
