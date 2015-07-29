describe('Results page test: ', function() {
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
                var quiz = '{"title":"Test","questions":[{"name":"Benefits","type":"mc","text":"MC Question","answers":["A","B","C","D"]},{"name":"Benefits","type":"tf","text":"TF Question","answers":[]},{"name":"Benefits","type":"ms","text":"MS Question","answers":["A","B","C","D"]},{"name":"Benefits","type":"tf","text":"TF Question","answers":[]},{"name":"Benefits","type":"ms","text":"MS Question","answers":["A","B","C","D"]}]}';
                var results = {
                    "answers": "[[2], [0], [1, 2], [0], [0, 1]]",
                    "selected": "[{\"answer\":[2]},{\"answer\":[0]},{\"answer\":[1, 2]},{\"answer\":[1]},{\"answer\":[0, 1, 2]}]",
                    "pointvalues" : "[2, 3, 2, 2, 5]"
                };
                $httpBackend.whenGET('/api/quiz/99999').respond(function(method, url, data, headers) {
                    return [200, quiz, {}];
                });
                $httpBackend.whenGET('/api/quiz/99999/results').respond(function(method, url, data, headers) {
                    return [200, results, {}];
                });
                $httpBackend.whenGET('/api/quiz/99999/points').respond(function(method, url, data, headers) {
                    return [200, points, {}];
                });
                $httpBackend.whenGET('/api/userscore/99999').respond(JSON.stringify({points: 7}));

                $httpBackend.whenGET(/.*/).passThrough();
                $httpBackend.whenPOST(/.*/).passThrough();
             });
        };
        browser.addMockModule('httpBackendMock', httpBackendMock);

        browser.get('http://localhost:3000/taker/#/results/99999');
    });

    it('Should show server-returned point total in overview window', function() {
        expect(element(by.cssContainingText('#results-prompt > .question :nth-child(3)', '7')).isPresent()).toBe(true);
    });

    it('Should show correct text in results header for each question', function() {
        // element(by.css('[ng-click="showAnswers()"]')).click();

        expect(
            element(by.repeater('question in questions').row(0))
            .element(by.cssContainingText('.resultsHeader', 'Congrats')).isPresent()
        ).toBe(true);

         expect(
            element(by.repeater('question in questions').row(1))
            .element(by.cssContainingText('.resultsHeader', 'Congrats')).isPresent()
        ).toBe(true);

        expect(
            element(by.repeater('question in questions').row(2))
            .element(by.cssContainingText('.resultsHeader', 'Congrats')).isPresent()
        ).toBe(true);

        expect(
            element(by.repeater('question in questions').row(3))
            .element(by.cssContainingText('.resultsHeader', 'Incorrect')).isPresent()
        ).toBe(true);

        expect(
            element(by.repeater('question in questions').row(4))
            .element(by.cssContainingText('.resultsHeader', 'Incorrect')).isPresent()
        ).toBe(true);
    });

    it('Should show correct point value if question is answered correctly', function() {
         expect(
            element(by.repeater('question in questions').row(0))
            .element(by.cssContainingText('.resultsHeader', '2')).isPresent()
        ).toBe(true);

         expect(
            element(by.repeater('question in questions').row(1))
            .element(by.cssContainingText('.resultsHeader', '3')).isPresent()
        ).toBe(true);

        expect(
            element(by.repeater('question in questions').row(2))
            .element(by.cssContainingText('.resultsHeader', '2')).isPresent()
        ).toBe(true);

    });

    // it('Should show incorrect flag if question is answered incorrectly', function() {
    //     expect(
    //          element(by.repeater('question in questions').row(1))
    //         .element(by.cssContainingText('.resultsHeader','Incorrect')).isPresent()
    //     ).toBe(true);
    // });

    it('logout', function() {
        browser.removeMockModule('httpBackendMock');
        browser.get('http://localhost:3000/logout');
    });
});