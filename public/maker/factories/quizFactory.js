app.factory("quizFactory", ["$http", function($http){
	var self = this;
	var cache = {};

	self.getQuizzes = function(callback){
		$http.get('/api/maker/quiz').success(callback);
	};

	self.getQuiz = function(id, callback){
		$http.get('/api/maker/quiz/' + id).success(callback);
	};

	self.formatQuiz = function(quiz){
		var data = {};
		if(quiz.title) {
			data.title = quiz.title;
		}
		if(quiz.questions && quiz.questions.length){
			data.questions = [];
			data.answers = [];
			data.pointValues = [];
			for(var i = 0; i < quiz.questions.length; i++){
				data.questions.push({
					type: quiz.questions[i].type,
					text: quiz.questions[i].text,
					answers: quiz.questions[i].answers,
					name: quiz.questions[i].name
				});
				data.answers.push(quiz.questions[i].correctAnswer);
				data.pointValues.push(parseInt(quiz.questions[i].points));
			}
		}
		if(quiz.publish) {
			data.publish = quiz.publish;
		}
		if(quiz.results) { 
			data.results = quiz.results;
		}
		return data;
	};

	self.saveQuiz = function(quiz, callback){
		var endpoint = '/api/maker/quiz';
		if(quiz.id) {
			endpoint += '/' + quiz.id;
		}

		var data = self.formatQuiz(quiz);
		
		var send = $http.post;
		if(quiz.id){
			send = $http.put;
		}

		send(endpoint, data).success(function(data){
			if(data.id){
				callback(data.id);
			} else {
				callback(data);
			}
		});
	};

	return self;
}]);