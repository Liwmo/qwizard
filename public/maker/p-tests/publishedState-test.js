describe('Manage quiz - Button States for a published quiz: ', function() {
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
                    answers: JSON.stringify([1]),
                    publish: '2050-01-01T06:00:00.000Z',
                    results: '2050-01-02T06:00:00.000Z'
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

    it('Create page button text are correct for quizzes that have been published', function() {
        browser.get('http://localhost:3000/maker/#/create/9000003');
        element.all(by.css('#makerButtons span')).then(function(items) {
            expect(items.length).toBe(3);
            expect(items[0].getText()).toBe('continue');
            expect(items[1].getText()).toBe('save changes');
            expect(items[2].getText()).toBe('cancel');
        });
    });

    it('Publish page button text are correct for quizzes that has been published', function() {
        browser.get('http://localhost:3000/maker/#/publish/9000003');
        browser.sleep(2000);
        element.all(by.css('#makerButtons > .nope')).then(function(items) {
            expect(items.length).toBe(3);
            expect(items[0].getText()).toBe('update');
            expect(items[1].getText()).toBe('revert to draft');
            expect(items[2].getText()).toBe('back');
        });
    }); 

    it('logout', function() {
        browser.removeMockModule('httpBackendMock');
        browser.get('http://localhost:3000/logout');
    });
});