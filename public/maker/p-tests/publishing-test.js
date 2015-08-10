describe('Manage quiz - Publishing a quiz: ', function() {
    var httpBackendMock = function(){
        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
            .run(function($httpBackend) {
                var questions = [
                    {
                        type:"mc",
                        text:"This is a MC question",
                        answers:["A", "B", "C", "D"],
                        name:"Question Category"
                    }
                ];
                var quiz = {
                    id: 9000003,
                    title: "Mock Title",
                    questions: JSON.stringify(questions),
                    pointvalues: JSON.stringify([5]),
                    answers: JSON.stringify([1])
                };
               
                $httpBackend.whenGET('/api/maker/quiz/9000003').respond(function(method, url, data, headers) {
                    return [200, quiz, {}];
                });
                $httpBackend.whenPOST('/api/maker/quiz').respond(function(method, url, data, headers) {
                    return [200, {id: 9000003}, {}];
                });
                $httpBackend.whenPUT('/api/maker/quiz/9000003').respond(function(method, url, data, headers) {
                    return [200, {id: 9000003}, {}];
                });

                $httpBackend.whenGET(/.*/).passThrough();
                $httpBackend.whenPUT(/.*/).passThrough();
                $httpBackend.whenPOST(/.*/).passThrough();
            });
    };

    it('login', function() {
        browser.get('http://localhost:3000/logout');
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();
        browser.addMockModule('httpBackendMock', httpBackendMock);
        browser.get('http://localhost:3000/maker');
    });

    it('Should be able to access the publish quiz view', function() {
        browser.get('http://localhost:3000/maker/#/publish/1');
        expect(browser.getCurrentUrl()).toBe('http://localhost:3000/maker/#/publish/1');
    });

    it('Publish button should redirect to publish quiz view', function() {
        browser.get('http://localhost:3000/maker/#/create');
        element(by.id('quiz_name')).sendKeys("Test Quiz Name");
        element(by.css('[ng-model="questionName"]')).sendKeys("Test Question Name");
        element(by.cssContainingText("option","True/False")).click()
        element(by.css('[ng-model="questionText"]')).sendKeys('Test question text');
        element(by.css('.radio[ng-click="tf(1)"]')).click();

        element(by.css('[ng-click="publishQuiz()"]')).click();
        browser.getLocationAbsUrl().then(function(url){
            expect(url.indexOf('/publish')).toNotBe(-1);
        });
    });

    it('Publish page button text are correct for quizzes that have not been published', function() {
        element.all(by.css('#makerButtons > .nope')).then(function(items) {
            expect(items.length).toBe(3);
            expect(items[0].getText()).toBe('publish');
            expect(items[1].getText()).toBe('save as draft');
            expect(items[2].getText()).toBe('back');
        });
    });

    it('Back button should go to the create quiz page', function() {
        element(by.cssContainingText(".nope", "back")).click();
        expect(element(by.css("#add-question")).isDisplayed()).toBeTruthy();
        element(by.cssContainingText(".nope", "continue")).click();
    });

    //  TODO: waiting for API endpoint to implement 
    // it('Should display quiz name at the top', function() {
    //     expect(element(by.name('quiz-name')).getText()).toBe('Test Quiz Name');
    // });

      // Commenting all of this because these tests do not test correct things because
      //   you cannot "sendKeys" to a datepicker field

    it('Should error on publish if there is no start or end date set', function() {
        browser.refresh();
        element(by.name("publish")).click();
        expect(element(by.css('.pop-over')).getAttribute('class')).toMatch('open');
    });

    it('Should error on publish if start date is a past date', function() {
        browser.refresh();
        element(by.name('start-date')).sendKeys('2015-07-01');
        element(by.name('end-date')).sendKeys('2015-07-02');
        element(by.name('publish')).click();
        expect(element(by.css('.pop-over')).getAttribute('class')).toMatch('open');
    });

    it('Should error on publish if end date is earlier than start date', function() {
        browser.refresh();
        element(by.name('start-date')).sendKeys('2025-07-02');
        element(by.name('end-date')).sendKeys('2020-07-02');
        element(by.name('publish')).click();
        expect(element(by.css('.pop-over')).getAttribute('class')).toMatch('open');
    });

    it('Should keep start date as is when entering end date', function() {
        browser.refresh();
        element(by.name('start-date')).sendKeys('2050-01-01');
        element(by.name('end-date')).sendKeys('2050-02-02');
        browser.sleep(500);
        expect(element(by.name('start-date')).getAttribute('value')).toMatch('2050-01-01');
    });

    it('Should redirect to manage quizzes on successful publish', function() {
        browser.refresh();
        element(by.name('start-date')).sendKeys('2050-01-01');
        element(by.name('end-date')).sendKeys('2050-01-02');
        element(by.name('publish')).click();
        expect(browser.getCurrentUrl()).toBe('http://localhost:3000/maker/#/');
    });

    it('logout', function() {
        browser.removeMockModule('httpBackendMock');
        browser.get('http://localhost:3000/logout');
    });
});