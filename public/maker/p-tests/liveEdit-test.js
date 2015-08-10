describe('liveEdit page: ', function() {
    it('Should log in and set up the mocks', function() {
        console.log('\n-----------Results Page Suite----------------');
        browser.get('http://localhost:3000/logout');
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();

        var httpBackendMock = function() {
            angular.module('httpBackendMock', ['ngMockE2E', 'app'])
              .run(function($httpBackend) {
                var quiz = '{"title":"Test","questions":[{"name":"Benefits","type":"mc","text":"MC Question","answers":["A","B","C","D"]},{"name":"Benefits","type":"tf","text":"TF Question","answers":[]},{"name":"Benefits","type":"ms","text":"MS Question","answers":["A","B","C","D"]},{"name":"Benefits","type":"tf","text":"TF Question","answers":[]},{"name":"Benefits","type":"ms","text":"MS Question","answers":["A","B","C","D"]},{"name":"Benefits","type":"tf","text":"TF Question","answers":[]}]}';
                var results = {
                    "answers": "[[2], [0], [1, 2], [0], [0, 1], [0]]",
                    //Correct, correct, correct, incorrect, incorrect, not answered
                    "selected": "[{\"answer\":[2]},{\"answer\":[0]},{\"answer\":[1, 2]},{\"answer\":[1]},{\"answer\":[0, 1, 2]},{\"answer\":[]}]",
                    "pointvalues" : "[2, 3, 2, 2, 5, 2]"
                };

                var liveQuizData = '[{"publish":"2015-08-06T05:00:00.000Z","results":"2015-08-07T05:00:00.000Z","title":"Testing Email Proxy","id":901002,"employees":0}]';
                $httpBackend.whenGET('/api/maker/manage/live').respond(function(method, url, data, headers) {
                    return [200, liveQuizData, {}];
                });
                $httpBackend.whenGET('/api/maker/quiz/901002').respond(function(method, url, data, headers) {
                    return [200, quiz, {}];
                });
                

                $httpBackend.whenGET(/.*/).passThrough();
                $httpBackend.whenPOST(/.*/).passThrough();
             });
        };
        browser.addMockModule('httpBackendMock', httpBackendMock);

    });

    it('Clicking a live quiz link will popup the confirmation', function(){
        browser.get('http://localhost:3000/maker/');
        element(by.css('#liveTab')).click();
        var popup = element(by.css('.pop-over'));
        var liveQuiz = element(by.repeater('quiz in live').row(0));
        liveQuiz.click();
        expect(popup.getAttribute('class')).toMatch('open');
    });

    it('pop right action will link to quiz edit page', function(){
        browser.get('http://localhost:3000/maker/');
        element(by.css('#liveTab')).click();
        var popup = element(by.css('.pop-over'));
        var liveQuiz = element(by.repeater('quiz in live').row(0));
        liveQuiz.click();
        expect(popup.element(by.css("a.button")).getAttribute('href')).toMatch('#/live_edit/901002');
    });

    it('logout', function() {
        browser.removeMockModule('httpBackendMock');
        browser.get('http://localhost:3000/logout');
    });
});