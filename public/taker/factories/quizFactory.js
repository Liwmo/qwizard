app.factory("quizFactory", ["$http", "$sce", function($http, $sce){
	var self = this;
	var quizzes = {};
	var cache = {};

	self.getAvailableQuizzes = function(callback){
		$http.get('/api/quiz/').success(function(data){
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
	
	self.getTakenQuizzes = function(callback){
		$http.get('/api/userscore/').success(function(data){
			callback(data);
		});
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

	self.getLiveQuizzes = function(callback){
		$http.get('/api/maker/manage/live').success(function(data){
			callback(data);
		});
	};

	self.getFinishedQuizzes = function(callback){
		$http.get('/api/maker/manage/finished').success(function(data){
			callback(data);
		});
	};

	self.getAllAnswersForAQuiz = function(id, questions, callback) {
		$http.get('/api/maker/manage/allAnswersForAQuiz/' + id).success(function(data){
			console.log(data);
			var responses = [];
			for(var i=0; i < data.length; i++) {
				data[i] = JSON.parse(data[i].answers);
				for(var j=0; j < data[i].length; j++) {
					if(j == responses.length){
						responses.push([0,0,0,0,0,0]);
					}
					if(typeof data[i][j].answer[0] == "string"){
						for(var x=0; x < data[i][j].answer.length; x++){
							if(data[i][j].answer[x] == questions[j].correct[x]){
								responses[j][x]++;
							}
						}
					}else{
						for(var x=0; x < data[i][j].answer.length; x++) {
							responses[j][data[i][j].answer[x]]++;
						}
					}
				}
			}
			console.log(responses);
			callback(responses);
		});
	};

	self.getScheduledQuizzes = function(callback){
		$http.get('/api/maker/manage/scheduled').success(function(data){
			var parsedData = data;
			for(var i = 0; i < data.length; i++) {
				parsedData[i].questions = JSON.parse(data[i].questions);
				parsedData[i].pointvalues = JSON.parse(data[i].pointvalues);
			}
			for (var i = 0; i < parsedData.length; i++) {
				var questions = parsedData[i].questions;
				for (var j = 0; j < questions.length; j++) {
					var qType = questions[j].type;
					if (qType == "ma" || qType == "pm") {
						parsedData[i].pointvalues[j] = parsedData[i].pointvalues[j] * 4;
					}
				}
			}

			for (var i = 0; i < parsedData.length; i++) {
            	parsedData[i].pointSum = parsedData[i].pointvalues.reduce(function(a, b) {return a + b}, 0);
        	}
			callback(parsedData);
		});
	};

	self.getDraftQuizzes = function(callback){
		$http.get('/api/maker/manage/drafts').success(function(data){
			callback(data);
		});
	};
	
	self.getTotalEmployees = function(callback){
		$http.get('/api/maker/manage/totalEmployees').success(function(data){
			callback(data);
		});
	};

	self.getQuizResultDetail = function(id, callback){
		var message = {};
		message.questions = {};
		$http.get('/api/maker/manage/quizResultDetail/' + id).success(function(data) {
			console.log(data);
			data.pointvalues = JSON.parse(data.pointvalues);
			data.questions = JSON.parse(data.questions);
			data.answers = JSON.parse(data.answers);
			message.questions = [];
			for(var i = 0; i < data.pointvalues.length; i++){
				message.questions.push({
					points: data.pointvalues[i],
					text: data.questions[i].text,
					type: data.questions[i].type,
					category: data.questions[i].name,
					answers: data.questions[i].answers,
					correct: data.answers[i]
				});
			}
			message.closeDate = data.closeDate;
			message.openDate = data.openDate;
			message.title = data.title;
			message.employees = data.employees;
			message.maxPoints = 0;
			message.avgPoints = data.avgPoints;
			message.possibleTakerCount = data.possibleTakerCount;
			for(var i=0; i < data.pointvalues.length; i++) {
				if(data.questions[i].type == 'pm' || data.questions[i].type == 'ma') {
					message.maxPoints += data.pointvalues[i] * 4;
				} else {
					message.maxPoints += data.pointvalues[i];
				}
			}
			callback(message);
		});
		// $http.get('/api/maker/manage/allSubmittedAnswers/' + id)	//TODO
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
		console.log('unformatquiz data: ', data);
		var quiz = {};
		quiz.id = data.id;
		quiz.title = data.title;
		quiz.publish = data.publish;
		quiz.results = data.results;
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
		data.publish = quiz.publish;
		data.results = quiz.results;
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
				console.log(data.error);
				callback(data);
			}
		});
	};
	
	return self;
}]);
