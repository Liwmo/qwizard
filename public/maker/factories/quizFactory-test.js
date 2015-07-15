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

	it('getQuiz - should hit the endpoint for quiz id', function(done){
		var id = 123456789;
		var str = Math.random().toString();
		mockHttp.expectGET('/api/maker/quiz/' + id).respond(str);
		factory.getQuiz(id, function(data){
			expect(data).toBe(str);
			done();
		});
		mockHttp.flush();
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