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

	            $httpBackend.whenGET('/api/quiz/3000').respond(function(method, url, data, headers) {
	                return [200, [], {"title":"Testing Quiz","questions":[{"type":"tf","text":"Answer me","answers":["","",""],"name":"True False"},{"type":"mc","text":"Answer Me!","answers":["Choice 1","Choice 2","Choice 3","Choice 4"],"name":"Multiple Choice"},{"type":"ms","text":"Answer ME!!","answers":["Option 1","Option 2","Option 3","Option 4"],"name":"Multiple Select"},{"type":"ma","text":"ANSWER ME!!!!","answers":["Clue 1:Option2","Clue 2:Option 1","Clue 3:Option4","Clue 4:Option3"],"name":"Matching"}],"closeDate":"2015-07-29T05:00:00.000Z"}];
	            });

	            $httpBackend.whenGET(/.*/).passThrough();
	            $httpBackend.whenPOST(/.*/).passThrough();
	         });
	    };
        browser.addMockModule('httpBackendMock', httpBackendMock);
	    browser.get('http://localhost:3000/taker/#/quiz/3000');
	    browser.sleep(5000);
		browser.removeMockModule('httpBackendMock');
  	});

  	it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });

});