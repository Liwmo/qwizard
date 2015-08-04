app.factory("quizFactory", ["$http", "$sce", function($http, $sce){
	var self = this;
	var quizzes = {};
	var cache = {};

	self.getLiveQuizzes = function(callback){
		$http.get('/api/quiz/').success(function(data){
			console.log(data);
			callback(data);
		});
	};

	self.getTakenQuizzes = function(callback){
		$http.get('/api/userscore/').success(function(data){
			console.log(data);
			callback(data);
		});
	};

	self.getLiveQuiz = function(id, callback){
		if(quizzes[id.toString()]){
			callback(quizzes[id.toString()]);
		}else{
			$http.get("/api/quiz/" + id).success(function(data){
				if(!data.error){
					for(var i = 0; i < data.questions.length; i++){
            			data.questions[i].selected = data.questions[i].selected || [];
                		data.questions[i].text = $sce.trustAsHtml(data.questions[i].text); //allows HTML question text
        			}
					quizzes[id.toString()] = data;
				}
				callback(data);
			});
		}
	};

	self.postQuiz = function(id, callback){
		var selected = [];
        for(var i = 0; i < quizzes[id.toString()].questions.length; i++){
            selected.push({
                answer: quizzes[id.toString()].questions[i].selected,
                // type: quizzes[id.toString()].questions[i].type
            });
        }
		$http.post("/api/quiz/" + id, selected).success(callback);
	};

	self.getQuizResults = function(id, callback) {
		$http.get("/api/quiz/" + id + "/results").success(callback);
	}


	//maker

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

	self.getMyQuiz = function(id, callback){
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
