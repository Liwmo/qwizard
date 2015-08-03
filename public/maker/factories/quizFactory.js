app.factory("quizFactory", ["$http", function($http){
	var self = this;
	var cache = {};

	self.getQuizzes = function(callback){
		$http.get('/api/maker/quiz').success(callback);
	};

	self.getFinishedQuizzes = function(callback){
		$http.get('/api/maker/manage/finished').success(function(data){
			callback(data);
		});
	};

	self.getTotalEmployees = function(callback){
		$http.get('/api/maker/manage/totalEmployees').success(function(data){
			callback(data);
		});
	};

	self.getQuiz = function(id, callback){
		$http.get('/api/maker/quiz/' + id).success(function(data){
			if(data.error){
				console.log(data.error);
				callback(data);
			}else{
				var quiz = self.unformatQuiz(data);
				callback(quiz);
			}
		});
	};
	//when receiving from server
	self.unformatQuiz = function(data){
		var quiz = {};
		quiz.id = data.id;
		quiz.title = data.title;
		quiz.questions = [];
		data.questions = JSON.parse(data.questions);
		data.answers = JSON.parse(data.answers);
		data.pointValues = JSON.parse(data.pointvalues);
		for(var i = 0; i < data.questions.length; i++){
			quiz.questions.push({
				type: data.questions[i].type,
				text: data.questions[i].text,
				answers: data.questions[i].answers,
				name: data.questions[i].name,
				correctAnswer: data.answers[i],
				points: data.pointValues[i]
			});
		}
		return quiz;
	};
	//for sending to server
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
		console.log(quiz);
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
				console.log(data.error);
				callback(data);
			}
		});
	};

	return self;
}]);