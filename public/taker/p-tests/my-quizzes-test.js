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
		element(by.css('.quizName')).click();
		expect(browser.getCurrentUrl()).toMatch('/quiz/123456789');
		browser.removeMockModule('httpBackendMock');
	});

	it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });

});