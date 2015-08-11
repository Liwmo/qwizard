describe('liveEdit page: ', function() {

    beforeEach(function(){
        browser.get('http://localhost:3000/logout');
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();

        var httpBackendMock = function() {
            angular.module('httpBackendMock', ['ngMockE2E', 'app'])
              .run(function($httpBackend) {
                var quiz = {"id":901002,"answers":"[[2],[2]]","author":1,"results":"2015-01-01T06:00:00.000Z","publish":"2015-10-10T05:00:00.000Z","pointvalues":"[2,2]","title":"Bidoof","questions":"[{\"type\":\"mc\",\"text\":\"We dont need no water\",\"answers\":[\"Let that pokeyman burn\",\"...\",\"im dying squirtle\"],\"name\":\"Fire\"},{\"type\":\"mc\",\"text\":\"Huh?\",\"answers\":[\"Um..\",\"Err..\",\"I dont even...\"],\"name\":\"Wat\"}]"};
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

    afterEach(function() {
        browser.removeMockModule('httpBackendMock');
        browser.get('http://localhost:3000/logout');
    });

    it('Clicking a live quiz link will popup the confirmation', function(){
        console.log('\n-----------Live Edit Suite----------------');
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

    it('should redirect to dashboard after hitting cancel > yes', function() {
        browser.get('http://localhost:3000/maker/#/live_edit/901002');
        browser.sleep(5000);
        element(by.css('[ng-click="cancelConfirm()"]')).click();
        var popup = element(by.css('.popup'));
        browser.sleep(500);
        popup.element(by.css('[ng-click="leftAction()"]')).click();
        expect(browser.getCurrentUrl()).toBe('http://localhost:3000/maker/#/');
    });
});