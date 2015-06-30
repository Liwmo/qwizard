app.factory("quizFactory", ["$http", function($http){
	var self = this;
	var quizzes = {};

	self.getQuiz = function(id, callback){
		if(quizzes[id.toString()]){
			callback(quizzes[id.toString()]);
		}else{
			$http.get("/api/quiz/" + id).success(function(data){
				if(typeof data !== 'string'){
					for(var i = 0; i < data.questions.length; i++){
            			data.questions[i].selected = data.questions[i].selected || [];
        			}
					quizzes[id.toString()] = data;
					callback(data);
				}
			});
		}
	};

	self.postQuiz = function(id, callback){
		var selected = [];
        for(var i = 0; i < quizzes[id.toString()].questions.length; i++){
            selected.push({
                answer: quizzes[id.toString()].questions[i].selected,
                type: quizzes[id.toString()].questions[i].type
            });
        }
		$http.post("/api/quiz/" + id, selected).success(callback);
	};

	return self;
}]);