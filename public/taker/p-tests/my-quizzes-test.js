describe('My Quizzes: ', function() {

	beforeEach(function(){
		browser.get('http://localhost:3000');
	});

	it('Should login before running any tests', function() {
	    browser.get('http://localhost:3000/logout');
	    browser.get('http://localhost:3000');
	    element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
	    element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
	    element(by.css('[type="submit"]')).click();

  	});

  	it('should not display live section when no quizzes are available', function(){
	    var httpBackendMock = function() {
	        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
	          .run(function($httpBackend) {

	            $httpBackend.whenGET('/api/quiz/').respond(function(method, url, data, headers) {
	                return [200, [], {}];
	            });

	            $httpBackend.whenGET(/.*/).passThrough();
	            $httpBackend.whenPOST(/.*/).passThrough();
	         });
	    };
        browser.addMockModule('httpBackendMock', httpBackendMock);
	    browser.get('http://localhost:3000/taker/#/myQuizzes');
	    browser.sleep(500);
  		expect(element(by.id('liveQuizzes')).getAttribute('class')).toMatch('ng-hide');
		browser.removeMockModule('httpBackendMock');
  	});

	it("should list live quizzes", function(){
		var httpBackendMock = function() {
	        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
	          .run(function($httpBackend) {

	            $httpBackend.whenGET('/api/quiz/').respond(function(method, url, data, headers) {
	                return [200, [{title: 'Mock Quiz', results: '2020-03-14T05:00:00.000Z', id: 123456789}], {}];
	            });

	            $httpBackend.whenGET(/.*/).passThrough();
	            $httpBackend.whenPOST(/.*/).passThrough();
	         });
	    };

		browser.addMockModule('httpBackendMock', httpBackendMock);
		browser.get('http://localhost:3000/taker/#/myQuizzes');
		browser.sleep(500);

		expect(element(by.id('liveQuizzes')).getAttribute('class')).toNotMatch('ng-hide');
		browser.removeMockModule('httpBackendMock');
	});

	it("should begin quiz by clicking on a row in live quizzes", function(){
		var httpBackendMock = function() {
	        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
	          .run(function($httpBackend) {

	            $httpBackend.whenGET('/api/quiz/').respond(function(method, url, data, headers) {
	                return [200, [{title: 'Mock Quiz', results: '2020-03-14T05:00:00.000Z', id: 123456789}], {}];
	            });

	            $httpBackend.whenGET('/api/quiz/123456789').respond(function(method, url, data, headers) {
	                return [200, {id: 123456789, title: "Mock Title", questions: []}, {}];
	            });

	            $httpBackend.whenGET(/.*/).passThrough();
	            $httpBackend.whenPOST(/.*/).passThrough();
	         });
	    };

		browser.addMockModule('httpBackendMock', httpBackendMock);
		browser.get('http://localhost:3000/taker/#/myQuizzes');
		browser.sleep(500);
		element.all(by.css('.quizName')).first().click();
		expect(browser.getCurrentUrl()).toMatch('/quiz/123456789');
		browser.removeMockModule('httpBackendMock');
	});

	it('should list quizzes with available results', function() {
		var httpBackendMock = function() {
	        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
	          .run(function($httpBackend) {

	            $httpBackend.whenGET('/api/userscore/').respond(function(method, url, data, headers) {
	                return [200, [{
	                	title: 'Mock Quiz', 
	                	results: '2015-03-19T05:00:00.000Z',
	                	publish: '2015-03-14T05:00:00.000Z',
	                	points: 15,
	                	viewed: false,
	                	id: 123456789
	                }], {}];
	            });

	            $httpBackend.whenGET(/.*/).passThrough();
	            $httpBackend.whenPOST(/.*/).passThrough();
	         });
	    };

		browser.addMockModule('httpBackendMock', httpBackendMock);
		browser.get('http://localhost:3000/taker/#/myQuizzes');
		browser.sleep(500);
		element.all(by.css('#results a')).then(function(children){
			expect(children.length).toBeTruthy();
		});
		browser.removeMockModule('httpBackendMock');
	});

	it('should mark quizzes with results not yet viewed', function() {
		var httpBackendMock = function() {
	        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
	          .run(function($httpBackend) {

	            $httpBackend.whenGET('/api/userscore/').respond(function(method, url, data, headers) {
	                return [200, [{
	                	title: 'Mock Quiz', 
	                	results: '2015-03-19T05:00:00.000Z',
	                	publish: '2015-03-14T05:00:00.000Z',
	                	points: 15,
	                	viewed: false,
	                	id: 123456789
	                },{
	                	title: 'Mock Quiz', 
	                	results: '2015-03-19T05:00:00.000Z',
	                	publish: '2015-03-14T05:00:00.000Z',
	                	points: 15,
	                	viewed: true,
	                	id: 123456790
	                }], {}];
	            });

	            $httpBackend.whenGET(/.*/).passThrough();
	            $httpBackend.whenPOST(/.*/).passThrough();
	         });
	    };

		browser.addMockModule('httpBackendMock', httpBackendMock);
		browser.get('http://localhost:3000/taker/#/myQuizzes');
		browser.sleep(500);
		expect(element.all(by.css('.dot')).first().getAttribute('class')).toNotMatch('viewed');
		expect(element.all(by.css('.dot')).get(1).getAttribute('class')).toMatch('viewed');
		browser.removeMockModule('httpBackendMock');
	});

	it('should show results of quiz by clicking on banner', function() {
		var httpBackendMock = function() {
	        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
	          .run(function($httpBackend) {

	            $httpBackend.whenGET('/api/userscore/').respond(function(method, url, data, headers) {
	                return [200, [{
	                	title: 'Mock Quiz', 
	                	results: '2015-03-19T05:00:00.000Z',
	                	publish: '2015-03-14T05:00:00.000Z',
	                	points: 15,
	                	viewed: false,
	                	id: 123456789
	                }], {}];
	            });

	            $httpBackend.whenGET(/.*/).passThrough();
	            $httpBackend.whenPOST(/.*/).passThrough();
	         });
	    };

		browser.addMockModule('httpBackendMock', httpBackendMock);
		browser.get('http://localhost:3000/taker/#/myQuizzes');
		browser.sleep(500);
		element.all(by.css('.point-container')).first().click();
		expect(browser.getCurrentUrl()).toMatch('/results/123456789');
		browser.removeMockModule('httpBackendMock');
	});

	it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });

});