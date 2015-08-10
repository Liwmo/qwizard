describe('create quiz', function() {

    var httpBackendMock = function(){
        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
            .run(function($httpBackend) {

            $httpBackend.whenPOST('/api/maker/quiz').respond(function(method, url, data, headers) {
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
        browser.get('http://localhost:3000/maker/#/create');
    });

    it('should have one question by default', function() {
        element.all(by.css("maker-question")).then(function(els){
            expect(els.length).toBe(1);
        });
    });

    it('should show true-false span when tf selected', function() {
        element(by.cssContainingText("option","True/False")).click();
        element.all(by.css(".tf")).then(function(els) {
            expect(els.length).toBe(1);
        });
    });

    it('should show multiple-choice span when mc selected', function() {
        element(by.cssContainingText("option","Multiple Choice")).click();
        element.all(by.css(".mc")).then(function(els) {
            expect(els.length).toBe(3);
        });
    });

    it('should show multiple-select span when ms selected', function() {
        element(by.cssContainingText("option","Multiple Select")).click();
        element.all(by.css(".ms")).then(function(els) {
            expect(els.length).toBe(3);
        });
    });

    it('should not default to a correct answer when TF', function() {
        element(by.cssContainingText("option","True/False")).click();
        expect(element.all(by.css('.radio[ng-click="tf(0)"]')).get(0).getAttribute('class')).toNotMatch('checked');
        expect(element.all(by.css('.radio[ng-click="tf(1)"]')).get(0).getAttribute('class')).toNotMatch('checked');
    });

    it('should default to 2 points when tf selected', function() {
        element(by.cssContainingText("option","True/False")).click();
        expect(element(by.css(".point-display")).getText()).toMatch("Points: 2");
    });

    it('should not default to a correct answer when MC', function() {
        element(by.cssContainingText("option","Multiple Choice")).click();
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(0).getAttribute('class')).toNotMatch('checked');
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(1).getAttribute('class')).toNotMatch('checked');
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(2).getAttribute('class')).toNotMatch('checked');
    });

    it('should default to 2 points when mc selected', function(){
        element(by.cssContainingText("option","Multiple Choice")).click();
        expect(element(by.css(".point-display")).getText()).toMatch("Points: 2");
    });

    it('should default to 5 points when ms selected', function() {
        element(by.cssContainingText("option","Multiple Select")).click();
        expect(element(by.css(".point-display")).getText()).toMatch("Points: 5");
    });

    it('should only select false when false is clicked in tf question', function() {
        element(by.cssContainingText("option","True/False")).click();
        element(by.css('.radio[ng-click="tf(1)"]')).click();
        expect(element(by.css('.radio[ng-click="tf(1)"]')).getAttribute('class')).toMatch('checked');
        expect(element(by.css('.radio[ng-click="tf(0)"]')).getAttribute('class')).toNotMatch('checked');
    });

    it('should only select second option when option 2 is clicked in mc question', function(){
        element(by.cssContainingText("option","Multiple Choice")).click();
        element.all(by.css('.radio[ng-click="mc($index)"]')).get(1).click();
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(1).getAttribute('class')).toMatch('checked');
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(0).getAttribute('class')).toNotMatch('checked');
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(2).getAttribute('class')).toNotMatch('checked');
    });

    it('should show error when quiz name is invalid or blank', function(){
        var field = element(by.id('quiz_name'));
        var error = element(by.css('[ng-hide="validName"]'));
        field.sendKeys('$$$$');
        expect(error.getAttribute('class')).toNotMatch('ng-hide');
        field.clear().then(function(){
            expect(error.getAttribute('class')).toNotMatch('ng-hide');
            field.sendKeys('Name');
            expect(error.getAttribute('class')).toMatch('ng-hide');
            field.clear();
        });
    });    

    it('should show error when quiz name is invalid or blank on publish', function(){
        var field = element(by.id('quiz_name'));
        var publish = element(by.css('[ng-click="publishQuiz()"]'));
        var popup = element(by.css('.popup'));
        publish.click();
        expect(popup.getAttribute('class')).toMatch('visible');
        browser.sleep(500);
        element(by.css('[ng-click="leftAction()"]')).click();
        field.sendKeys('$$$$');
        publish.click();
        expect(popup.getAttribute('class')).toMatch('visible');
        browser.sleep(500);
        element(by.css('[ng-click="leftAction()"]')).click();
        field.clear().then(function(){
            field.sendKeys('Quiz Name');
        });
    });  

    // it('should show error when question list is empty on publish', function(){
    //     element(by.css('[ng-click="removeQuestion(index)"]')).click();
    //     var publish = element(by.css('[ng-click="publishQuiz()"]'));
    //     var popup = element(by.css('.popup'));
    //     publish.click();
    //     expect(popup.getAttribute('class')).toMatch('visible');
    //     browser.sleep(500);
    //     element(by.css('[ng-click="leftAction()"]')).click();

    // });

    it('should show error when question name or text is empty on publish', function(){
        element(by.css('#add-question')).click();
        element(by.css('[ng-model="questionName"]')).sendKeys("$$$$");
        var publish = element(by.css('[ng-click="publishQuiz()"]'));
        var popup = element(by.css('.popup'));
        publish.click();
        expect(popup.getAttribute('class')).toMatch('visible');
        browser.sleep(500);
        element(by.css('[ng-click="leftAction()"]')).click();
        element(by.css('[ng-model="questionName"]')).clear().then(function() {
            element(by.css('.question-text')).sendKeys('$$$$');
            publish.click();
            expect(popup.getAttribute('class')).toMatch('visible');
            browser.sleep(500);
            element(by.css('[ng-click="leftAction()"]')).click();
        });
    });

    it('should show error when question type is not defined on publish', function(){
        var publish = element(by.css('[ng-click="publishQuiz()"]'));
        element(by.css('[ng-model="questionName"]')).sendKeys("$$$$");
        publish.click();
        expect(element(by.css('.popup')).getAttribute('class')).toMatch('visible');
        browser.sleep(500);
        element(by.css('[ng-click="leftAction()"]')).click();
    });

    it('should remove question when delete button is clicked', function(){
        browser.get('http://localhost:3000/maker/#/create');
        element(by.css('[ng-click="remove()"]')).click();
        element.all(by.css('maker-question')).then(function(elements) {
            expect(elements.length).toBe(0);
        });
    });

    it('should remove the question which was clicked', function() {
        element(by.css('#add-question')).click();
        element(by.css('#add-question')).click();
        element(by.css('#add-question')).click();
        element.all(by.css('[ng-model="questionName"]')).then(function(elements) {
            for (var i = 0; i < elements.length; i++) {
                elements[i].sendKeys("" + i);
            }
            browser.sleep(500);
            element.all(by.css('.delete')).then(function(elements) {
                elements[1].click();
                browser.sleep(500);
                element.all(by.css('[ng-model="questionName"]')).then(function(elements) {
                    expect(elements.length).toBe(2);
                    expect(elements[0].getAttribute('value')).toBe('0');
                    expect(elements[1].getAttribute('value')).toBe('2');
                });
            });
        });
    });

    it('should add question when add question button is clicked', function() {
        element(by.css('#add-question')).click();
        element.all(by.css('maker-question')).then(function(elements) {
            beforeAddingLength = elements.length;
            element(by.css('#add-question')).click();
            element.all(by.css('maker-question')).then(function(elements) {
            expect(elements.length).toBe(beforeAddingLength + 1);
            });
        });
    });

    describe('MS Testing', function() {
        var quizNameInput = element(by.id('quiz_name'));
        var questionNameInput = element(by.css('[ng-model="questionName"]'));
        var questionTextInput = element(by.css('[ng-model="questionText"]'));
        var popup = element(by.css('.popup'));
        var popupText = element(by.css('.popup .noselect'));
        var publish = element(by.css('[ng-click="publishQuiz()"]'));
        var dismiss = element(by.css('[ng-click="leftAction()"]'));

        beforeEach(function() {
            browser.get("http://localhost:3000/maker/#/create");
        });

        it('should have the ability to select a type Multiple-select', function() {
            element(by.cssContainingText("option","Multiple Select")).click();
            element.all(by.css(".ms")).then(function(elements) {
                expect(elements.length).toBe(3);
            });
        });

        it('should check second option when option 2 is clicked', function() {
            element(by.cssContainingText("option","Multiple Select")).click();
            element.all(by.css('.check-box[ng-click="ms($index)"]')).get(1).click();
            expect(element.all(by.css('.check-box[ng-click="ms($index)"]')).get(1).getAttribute('class')).toMatch('checked');
        });

        it('should error if publishing when possible answers\' text are not entered', function() {
            element(by.cssContainingText("option","Multiple Select")).click();
            quizNameInput.sendKeys("TestQuiz");
            questionNameInput.sendKeys("TestQuestion");
            questionTextInput.sendKeys("TestQuestionText");
            element.all(by.css('.check-box[ng-click="ms($index)"]')).get(1).click();
            publish.click();
            browser.sleep(500);
            expect(popup.getAttribute('class')).toMatch('visible');
            expect(popupText.getText()).toBe("On Question 1, an answer does not have any text.");
            dismiss.click();
        });

        it('should error if a correct answer is not selected', function() {
            element(by.cssContainingText("option","Multiple Select")).click();
            quizNameInput.sendKeys("TestQuiz");
            questionNameInput.sendKeys("TestQuestion");
            questionTextInput.sendKeys("TestQuestionText");;
            publish.click();
            browser.sleep(500);
            expect(popup.getAttribute('class')).toMatch('visible');
            expect(popupText.getText()).toBe("Question 1 does not have an answer selected.");
            dismiss.click();
        });

        it('should allow multiple answers to be selected and published', function() {
            element(by.cssContainingText("option","Multiple Select")).click();
            quizNameInput.sendKeys("TestQuiz");
            questionNameInput.sendKeys("TestQuestion");
            questionTextInput.sendKeys("TestQuestionText");
            element.all(by.css('.check-box[ng-click="ms($index)"]')).get(1).click();
            element.all(by.css('.check-box[ng-click="ms($index)"]')).get(0).click();
            element.all(by.css('.msText')).get(0).sendKeys("TestAnswer");
            element.all(by.css('.msText')).get(1).sendKeys("TestAnswer");
            element.all(by.css('.msText')).get(2).sendKeys("TestAnswer");
            publish.click();
            var expectedUrl = "http://localhost:3000/maker/#/publish/";
            browser.getCurrentUrl().then(function(url) {
                expect(url.slice(0, expectedUrl.length)).toBe(expectedUrl);
            });
        });

        it('should increase answers options when button is pressed', function() {
            element(by.cssContainingText("option","Multiple Select")).click();
            element.all(by.css('.msText')).then(function(msOptions) {
                beforeClickLength = msOptions.length;
                element(by.css('[ng-click="addOption()"]')).click();
                element.all(by.css('.msText')).then(function(elements) {
                    expect(elements.length).toBe(beforeClickLength+1);
                }); 
            }); 
        });
        
        it('should not be able to add more than 6 options (max)', function() {
            element(by.cssContainingText("option","Multiple Select")).click();
            element(by.css('[ng-click="addOption()"]')).click();
            element(by.css('[ng-click="addOption()"]')).click();
            element(by.css('[ng-click="addOption()"]')).click();
            expect(element(by.css('[ng-click="addOption()"]')).getAttribute('class')).toMatch("ng-hide");
        });
    });
    it("Run MA", function() {
        describe('MA Testing', function() {
            var quizNameInput = element(by.id('quiz_name'));
            var questionNameInput = element(by.css('[ng-model="questionName"]'));
            var questionTextInput = element(by.css('[ng-model="questionText"]'));
            var popup = element(by.css('.popup'));
            var popupText = element(by.css('.popup .noselect'));
            var publish = element(by.css('[ng-click="publishQuiz()"]'));
            var dismiss = element(by.css('[ng-click="leftAction()"]'));
         
            var httpBackendMock = function() {
                angular.module('httpBackendMock', ['ngMockE2E', 'app']).run(function($httpBackend) {
                    // $httpBackend.whenPOST('/api/maker/quiz').respond(function(method, url, data, headers) {
                    //     return [200, {id: 1}, {}];
                    // });

                    // $httpBackend.whenGET('/api/maker/quiz/1').respond(function(method, url, data, headers) {
                    //     return [200, {id: 1, title: "Mock Title", }, {}];
                    // });

                    var quizObject = {
                        id:1, 
                        answers:JSON.stringify([["clue1:answer1", "clue2:answer2", "clue3:answer3","clue4:answer4"]]),
                        results:null,
                        publish:null,
                        author:1,
                        pointvalues:JSON.stringify([7]),
                        title:"Name",
                        questions:JSON.stringify([{type:"ma", text:"Match", answers:["clue1:answer1", "clue2:answer4", "clue3:answer3", "clue4:answer2"], name:"Quiz category"}])
                    };

                    var employees = ["clue1:answer1", "clue2:answer4", "clue3:answer3", "clue4:answer2"];


                    $httpBackend.whenGET('/api/maker/quiz/1').respond(function(method, url, data, headers) {
                        return [200, quizObject, {}];
                    });

                    $httpBackend.whenGET('/api/maker/randomEmployees').respond(function(method, url, data, headers) {
                        return [200, employees, {}];
                    });

                    // $httpBackend.whenPUT('/api/maker/quiz/9000003').respond(function(method, url, data, headers) {
                    //     return [200, {id: 1}, {}];
                    // });

                    $httpBackend.whenGET(/.*/).passThrough();
                    $httpBackend.whenPUT(/.*/).passThrough();
                    $httpBackend.whenPOST(/.*/).passThrough();
                });
            };

            beforeEach(function() {
                browser.get("http://localhost:3000/maker/#/create");
            });

            it ("login for MA Testing", function() {
                browser.get('http://localhost:3000/logout');
                browser.get('http://localhost:3000');
                element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
                element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
                element(by.css('[type="submit"]')).click();
                browser.addMockModule('httpBackendMock', httpBackendMock);
                browser.get('http://localhost:3000/maker/#/create');
            });

            it('should have the ability to select a type Matching', function() {
                element(by.cssContainingText("option","Matching")).click();
                element.all(by.css("[ng-show=\"questionType=='ma'\"].ng-hide")).then(function(els) {
                    expect(els.length).toBe(0);
                });
            });

            it('should have 4 clue fields for both text and photo matching', function() {
                element(by.cssContainingText("option","Matching")).click();
                expect(element.all(by.css('.ma .clue')).count()).toBe(4);
            });

            it('should have 4 answer fields', function() {
                element(by.cssContainingText("option","Matching")).click();
                expect(element.all(by.css('.ma .maAnswer')).count()).toBe(4);
                browser.sleep(5000);
            });

            it('should have 4 answer and 4 clue fields for photo macthing', function() {
                element(by.cssContainingText("option","Photo Matching")).click();
                expect(element.all(by.css('.pm .clue')).count()).toBe(4);
                expect(element.all(by.css('.pm .maAnswer')).count()).toBe(4);
            });
            it('should popup error if clue field is empty', function() {
                quizNameInput.sendKeys('IIII');
                questionTextInput.sendKeys('IIIIText');
                questionNameInput.sendKeys('IIIIName');
                element(by.cssContainingText("option","Matching")).click();
                element.all(by.css('maker-question .answer')).then(function(elements) {
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].sendKeys('iiii');
                    }
                    publish.click();
                    browser.sleep(500);
                    expect(popup.getAttribute('class')).toMatch('visible');
                    dismiss.click();
                    browser.sleep(5000);
                });
            });
            it('should popup error if answer field is empty', function() {
                quizNameInput.sendKeys('IIII');
                questionTextInput.sendKeys('IIIIText');
                questionNameInput.sendKeys('IIIIName');
                element(by.cssContainingText("option","Matching")).click();
                element.all(by.css('[ng-show="questionType=\'ma\'"] .clue')).then(function(elements) {
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].sendKeys('iiii');
                    }
                    publish.click();
                    browser.sleep(500);
                    expect(popup.getAttribute('class')).toMatch('visible');
                    dismiss.click();
                });
            });

            it('should properly populate fields when it gets a draft', function() {
                browser.get("http://localhost:3000/maker/#/create/1");
                browser.sleep(500);
                expect(element(by.css('[ng-model="quizName"]')).getAttribute('value')).toBe("Name");
            });
        });
    });
    it('should not allow one to type more than 300 characters into the question text field', function() {
        browser.get("http://localhost:3000/maker/#/create");
        element(by.css('[ng-model="questionText"]')).clear();
        var tooMuchText = new Array(600).join('i');

        element(by.css('[ng-model="questionText"]')).sendKeys(tooMuchText);
        expect(element(by.css('[ng-model="questionText"]')).getAttribute('value')).toBe(new Array(301).join('i'));
    });

    it('should not allow one to type more than 20 characters into the question title field', function() {
        element(by.css('[ng-model="questionName"]')).clear();
        var tooMuchText = new Array(600).join('i');

        element(by.css('[ng-model="questionName"]')).sendKeys(tooMuchText);
        expect(element(by.css('[ng-model="questionName"]')).getAttribute('value')).toBe("iiiiiiiiiiiiiiiiiiii");
    });

    it('should not allow one to type more than 20 characters into the quiz title field', function() {
        element(by.css('[ng-model="quizName"]')).clear();
        var tooMuchText = new Array(600).join('i');

        element(by.css('[ng-model="quizName"]')).sendKeys(tooMuchText);
        expect(element(by.css('[ng-model="quizName"]')).getAttribute('value')).toBe("iiiiiiiiiiiiiiiiiiii");
    });

    it('should not allow one to type more than 100 characters into the answer text field', function() {
        element(by.cssContainingText("option","Multiple Choice")).click();
        element(by.css('[ng-model="possibleAnswers[$index]"]')).clear();
        var tooMuchText = new Array(30).join('aeiou');

        element(by.css('[ng-model="possibleAnswers[$index]"]')).sendKeys(tooMuchText);
        expect(element(by.css('[ng-model="possibleAnswers[$index]"]')).getAttribute('value')).toBe(new Array(21).join('aeiou'));
    });

    it('should not show "delete answer" buttons when only 3 answers are showing', function() {
        browser.refresh();
        element(by.cssContainingText("option","Multiple Choice")).click();
        element.all(by.css('[class="delete-answer"]')).then(function(elements) {
            for(var i = 0; i < elements.length; i++){
                expect(elements[i].getAttribute('class')).toMatch("ng-hide");
            }
        });
    });

    it('should show "delete answer" button when more than 3 answers are showing', function() {
        element(by.css('[ng-click="addOption()"]')).click();
        element.all(by.css('[class="delete-answer"]')).then(function(elements) {
            for(var i = 0; i < elements.length; i++){
                expect(elements[i].getAttribute('class')).not.toMatch("ng-hide");
            }
        });
    });

    it('should remove one answer when the delete answer button is clicked', function() {
        var size;
        element.all(by.css('[ng-click="mc($index)"]')).then(function(elements) {
            size = elements.length;
        });

        element(by.css('[ng-click="removeAnswer($index)"]')).click();

        element.all(by.css('[ng-click="mc($index)"]')).then(function(elements) {
            expect(elements.length).toBe(size-1);
        });
    });

    it('should remove the answer next to the button that was clicked', function() {
        element(by.css('[ng-click="addOption()"]')).click();
        element.all(by.css('[ng-model="possibleAnswers[$index]"]')).then(function(elements) {
            elements[2].sendKeys("To Be Deleted");
            elements[3].sendKeys("To Remain");
        });    

        element.all(by.css('[ng-click="removeAnswer($index)"]')).then(function(elements) {
            elements[2].click();
        });

        element.all(by.css('[ng-model="possibleAnswers[$index]"]')).then(function(elements) {
            expect(elements[2].getAttribute("value")).toBe("To Remain");
        }); 
    });

    it('should remove the answer as "correct" when the answer is deleted', function() {
        browser.refresh();
        element(by.cssContainingText("option","Multiple Select")).click();
        element(by.css('[ng-click="addOption()"]')).click();
        element.all(by.css('[ng-click="ms($index)"]')).then(function(elements){
            elements[elements.length-1].click();
            expect(elements[elements.length-1].getAttribute("class")).toMatch("checked");
            element.all(by.css('[ng-click="removeAnswer($index)"]')).then(function(elements) {
                elements[elements.length - 1].click();
                element(by.css('[ng-click="addOption()"]')).click();
                element.all(by.css('[ng-click="ms($index)"]')).then(function(elements){
                    expect(elements[elements.length-1].getAttribute("class")).not.toMatch("checked");
                });
            });

        });
    });

    it('logout', function() {
        browser.removeMockModule('httpBackendMock');
        browser.get('http://localhost:3000/logout');
    });
});