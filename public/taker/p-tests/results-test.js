describe('Results page test: ', function() {

        beforeEach(function() {
            browser.get('http://localhost:3000');
            element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
            element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
            element(by.css('[type="submit"]')).click();

            var httpBackendMock = function() {
                angular.module('httpBackendMock', ['ngMockE2E', 'app'])
                  .run(function($httpBackend) {
                    var quiz = {
                        title: "Test",
                        questions: [
                            {
                                type: "tf",
                                answers: [],
                                text: "",
                                name: ""
                            },
                            {
                                type: "ms",
                                answers: ["a", "b", "c", "d"],
                                text: "",
                                name: ""
                            },
                            {
                                type: "mc",
                                answers: ["a", "b", "c", "d"],
                                text: "",
                                name: ""
                            },
                            {
                                type: "tf",
                                answers: [],
                                text: "",
                                name: ""
                            },
                            {
                                type: "ms",
                                answers: ["a", "b", "c", "d"],
                                text: "",
                                name: ""
                            }
                        ]
                    };
                    var results = {
                        selected: [{answer:[0]},{answer:[2, 3]},{answer:[1]},{answer:[1]},{answer: [0, 2, 3]}],
                        answers: [[0], [2, 3], [1], [0], [0, 3]]
                    }
                    var points = [2, 3, 2, 2, 5];

                    $httpBackend.whenGET('/api/quiz/99999').respond(quiz);
                    $httpBackend.whenGET('/api/quiz/99999/results').respond(results);
                    $httpBackend.whenGET('/api/quiz/99999/points').respond(points);
                    $httpBackend.whenGET('/api/userscore/99999').respond(56);
                 });
            };
            browser.addMockModule('httpBackendMock', httpBackendMock);
        });

        it('Should show correct flag if question is answered correctly', function() {
            browser.get('http://localhost:3000/taker/#/results/99999');
            var myElement = element(by.css('.correctFlag'));
            expect(myElement.isPresent()).toBeTruthy();
            expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/results/99999');
        });
});