'use strict';

describe('quiz factory tests', function(){
	var factory;
	var quiz;
	var mockUrl;

	var mockHttp;

	beforeEach(module('app'));
	beforeEach(inject(function($httpBackend, quizFactory){
		factory = quizFactory;
		mockHttp = $httpBackend;
	}));

	it('getQuizzes - should hit the endpoint for all quizzes associated with the author', function(done){
		var str = Math.random().toString();
		mockHttp.expectGET('/api/maker/quiz').respond(str);
		factory.getQuizzes(function(data){
			expect(data).toBe(str);
			done();
		});
		mockHttp.flush();
	});

	it('getQuiz - should pass error to controller to be handled', function(done){
		var id = 123456789;
		var error = {
			error: "This is an error."
		};

		mockHttp.expectGET('/api/maker/quiz/' + id).respond(error);
		factory.getQuiz(id, function(data){
			expect(data).toEqual(error);
			done();
		});
		mockHttp.flush();
	});

	it('getQuiz - should pass data to unformatQuiz and pass result to callback', function(done){
		var id = 123456789;
		var quiz = {
			title: "original data"
		};

		var unformattedQuiz = {
			title: "unformatted"
		};

		factory.unformatQuiz = function(quizPassed){
			expect(quizPassed).toEqual(quiz);
			return unformattedQuiz;
		};

		mockHttp.expectGET('/api/maker/quiz/' + id).respond(quiz);
		factory.getQuiz(id, function(data){
			expect(data).toBe(unformattedQuiz);
			done();
		});
		mockHttp.flush();
	});

	it('unformatQuiz - correctly structures quiz data for client use', function(){
		var data = {
			"id":58,
			"answers":"[[0],[0],[0]]",
			"results":null,
			"publish":null,
			"title":"Title",
			"questions":"[{\"type\":\"tf\",\"text\":\"Its true now, agian\",\"answers\":[\"\",\"\",\"\"],\"name\":\"Q1\"},{\"type\":\"tf\",\"text\":\"asdf\",\"answers\":[\"\",\"\",\"\"],\"name\":\"asdf\"},{\"type\":\"tf\",\"text\":\"\",\"answers\":[\"\",\"\",\"\"],\"name\":\"\"}]",
			"pointvalues":"[1,2,2]",
			"author":1
		};
		var quiz = factory.unformatQuiz(data);
		expect(quiz.title).toBe(data.title);
		expect(quiz.id).toBe(data.id);
		expect(quiz.questions.length).toEqual(data.questions.length);
		expect(quiz.pointvalues).toBeFalsy();
		expect(quiz.answers).toBeFalsy();
		expect(quiz.questions[0].correctAnswer).toBeTruthy();
		expect(quiz.questions[0].points).toBeTruthy();
	});

	it('saveQuiz - should hit endpoint for posting', function(done){
		var str = Math.random().toString();
		mockHttp.expectPOST('/api/maker/quiz').respond(str);
		factory.saveQuiz({}, function(data){
			expect(data).toBe(str);
			done();
		});
		mockHttp.flush();
	});

	it('saveQuiz - should hit endpoint for putting when an id is passed', function(done){
		var id = Math.random();
		var str = Math.random().toString();
		mockHttp.expectPUT('/api/maker/quiz/' + id).respond(str);
		factory.saveQuiz({id: id}, function(data){
			expect(str).toBe(str);
			done();
		});
		mockHttp.flush();
	});

	it('formatQuiz - should reformat question data into proper fields', function(){
		var quiz = {
			title: "Mock Title",
			publish: "2015-07-15",
			results: "2015-07-18",
			questions: [
				{
					type: 'mc',
					text: 'Mock Text',
					answers: ['Mock Answer'],
					name: 'Mock Name',
					correctAnswer: [0],
					points: 2
				}
			]
		};

		var result = factory.formatQuiz(quiz);
		expect(result.questions).toBeTruthy();
		expect(result.answers).toBeTruthy();
		expect(result.pointValues).toBeTruthy();
		expect(result.title).toBe(quiz.title);
		expect(result.publish).toBe(quiz.publish);
		expect(result.results).toBe(quiz.results);
	});
});