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
                var quiz = '{"title":"Test","questions":[{"name":"Benefits","type":"mc","text":"MC Question","answers":["A","B","C","D"]},{"name":"Benefits","type":"tf","text":"TF Question","answers":[]},{"name":"Benefits","type":"ms","text":"MS Question","answers":["A","B","C","D"]},{"name":"Benefits","type":"tf","text":"TF Question","answers":[]},{"name":"Benefits","type":"ms","text":"MS Question","answers":["A","B","C","D"]},{"name":"Benefits","type":"tf","text":"TF Question","answers":[]}]}';
                var results = {
                    "answers": "[[2], [0], [1, 2], [0], [0, 1], [0]]",
                    //Correct, correct, correct, incorrect, incorrect, not answered
                    "selected": "[{\"answer\":[2]},{\"answer\":[0]},{\"answer\":[1, 2]},{\"answer\":[1]},{\"answer\":[0, 1, 2]},{\"answer\":[]}]",
                    "pointvalues" : "[2, 3, 2, 2, 5, 2]"
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
            .element(by.cssContainingText('.resultsHeader', 'Perfect')).isPresent()
        ).toBe(true);

         expect(
            element(by.repeater('question in questions').row(1))
            .element(by.cssContainingText('.resultsHeader', 'Perfect')).isPresent()
        ).toBe(true);

        expect(
            element(by.repeater('question in questions').row(2))
            .element(by.cssContainingText('.resultsHeader', 'Perfect')).isPresent()
        ).toBe(true);

        expect(
            element(by.repeater('question in questions').row(3))
            .element(by.cssContainingText('.resultsHeader', 'Incorrect')).isPresent()
        ).toBe(true);

        expect(
            element(by.repeater('question in questions').row(4))
            .element(by.cssContainingText('.resultsHeader', 'Incorrect')).isPresent()
        ).toBe(true);

        expect(
            element(by.repeater('question in questions').row(5))
            .element(by.cssContainingText('.resultsHeader', 'Not answered')).isPresent()
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

    describe('Matching Results', function() {
        it('Set up new mock', function() {
            browser.get('http://localhost:3000/logout');
            browser.get('http://localhost:3000');
            element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
            element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
            element(by.css('[type="submit"]')).click();
            var httpBackendMock = function() {
                angular.module('httpBackendMock', ['ngMockE2E', 'app'])
                  .run(function($httpBackend) {
                    var quiz = '{"title":"Test","questions":[{"name":"Benefits","type":"ma","text":"Question1","answers":["one:one", "two:two", "three:three", "four:four"]},' + 
                                                             '{"name":"Stuff", "type":"ma", "text":"Question2", "answers":["one:one", "two:two", "three:three", "four:four"]},' +
                                                             '{"name":"More Stuff", "type":"ma", "text":"Question3", "answers":["one:one", "two:two", "three:three", "four:four"]}]}';
                    var results = {
                        "answers": "[[\"one:one\", \"two:two\", \"three:three\", \"four:four\"], [\"one:one\", \"two:two\", \"three:three\", \"four:four\"], [\"one:one\", \"two:two\", \"three:three\", \"four:four\"]]",
                        "selected": "[{\"answer\":[\"one:one\", \"two:three\", \"three:two\", \"four:four\"]}, {\"answer\":[]}, {\"answer\":[\"one:one\", \"two:two\", \"three:three\", \"four:four\"]}]",
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

        it('should display correct answers in purple', function() {
            element(by.css('[ng-click="showAnswers()"]')).click();
            var answers = element(by.repeater('question in questions').row(0)).element(by.repeater('answer in correct track by $index').row(0)).element(by.css('.button'));
            expect(answers.getAttribute("class")).toMatch("purple-medium");
        });

        it('should display incorrect answers in teal', function() {
            var answers = element(by.repeater('question in questions').row(0)).element(by.repeater('answer in correct track by $index').row(1)).element(by.css('.button'));
            expect(answers.getAttribute("class")).not.toMatch("purple-medium");
        });

        it('should display correct message for partial points', function() {
            expect(element(by.repeater('question in questions').row(0)).element(by.cssContainingText('.resultsHeader', 'Partial credit')).isPresent()).toBe(true);
        });

        it('should display correct message for unanswered matching question', function() {
            expect(element(by.repeater('question in questions').row(1)).element(by.cssContainingText('.resultsHeader', 'Uh oh, ')).isPresent()).toBe(true);
        });

        it('should display correct message for correct answer', function() {
            expect(element(by.repeater('question in questions').row(2)).element(by.cssContainingText('.resultsHeader', 'Perfect!')).isPresent()).toBe(true);
        });

        it('logout', function() {
            browser.removeMockModule('httpBackendMock');
            browser.get('http://localhost:3000/logout');
        });
    });
});