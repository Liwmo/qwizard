describe('create quiz', function() {
    it('login', function() {
        browser.get('http://localhost:3000/logout');
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();
        browser.get('http://localhost:3000/maker/#/create');
    });

    it('should have one question by default', function() {
        element.all(by.css("maker-question")).then(function(els){
            expect(els.length).toBe(1);
        });
    });

    it('should show true-false span when tf selected', function() {
        expect(element(by.css("[ng-show=\"questionType=='tf'\"]")).getAttribute('class')).toMatch('ng-hide');
        element(by.cssContainingText("option","True/False")).click();
        expect(element(by.css("[ng-show=\"questionType=='tf'\"]")).getAttribute('class')).toNotMatch('ng-hide');
    });

    it('should show multiple-choice span when mc selected', function() {
        expect(element(by.css("[ng-show=\"questionType=='mc'\"]")).getAttribute('class')).toMatch('ng-hide');
        element(by.cssContainingText("option","Multiple Choice")).click();
        expect(element(by.css("[ng-show=\"questionType=='mc'\"]")).getAttribute('class')).toNotMatch('ng-hide');
    });

    it('should show multiple-select span when ms selected', function() {
        expect(element(by.css("[ng-show=\"questionType=='ms'\"]")).getAttribute('class')).toMatch('ng-hide');
        element(by.cssContainingText("option","Multiple Select")).click();
        expect(element(by.css("[ng-show=\"questionType=='ms'\"]")).getAttribute('class')).toNotMatch('ng-hide');
    });

    it('should default correct answer to true when tf selected', function() {
        element(by.cssContainingText("option","True/False")).click();
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(0).getAttribute('class')).toMatch('checked');
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(1).getAttribute('class')).toNotMatch('checked');
    });

    it('should default to 2 points when tf selected', function() {
        element(by.cssContainingText("option","True/False")).click();
        expect(element(by.css(".point-display")).getText()).toMatch("Points: 2");
    });

    it('should default correct answer to option 1 when mc selected', function() {
        element(by.cssContainingText("option","True/False")).click();
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(0).getAttribute('class')).toMatch('checked');
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
            element(by.css('[ng-model="questionText"]')).sendKeys('$$$$');
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

    // it('should remove question when delete button is clicked', function(){
    //     element(by.css('[ng-click="removeQuestion(index)"]')).click();
    //     element.all(by.css('maker-question')).then(function(elements) {
    //         expect(elements.length).toBe(0);
    //     });
    // });

    it('should add question when add question button is clicked', function() {
        element(by.css('#add-question')).click();
        element.all(by.css('maker-question')).then(function(elements) {
            expect(elements.length).toBe(3);
            element(by.css('#add-question')).click();
            element.all(by.css('maker-question')).then(function(elements) {
            expect(elements.length).toBe(4);            
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

        it('should have the ability to select a type Multiple-select', function() {
            browser.get("http://localhost:3000/maker/#/create");
            element(by.cssContainingText("option","Multiple Select")).click();
            expect(element(by.css("[ng-show=\"questionType=='ms'\"]")).getAttribute('class')).toNotMatch('ng-hide');
        });

        it('should check second option when option 2 is clicked', function() {
             element.all(by.css('.check-box[ng-click="ms($index)"]')).get(1).click();
             expect(element.all(by.css('.check-box[ng-click="ms($index)"]')).get(1).getAttribute('class')).toMatch('checked');
        });

        it('should error if publishing when possible answers\' text are not entered', function() {
            quizNameInput.sendKeys("TestQuiz");
            questionNameInput.sendKeys("TestQuestion");
            questionTextInput.sendKeys("TestQuestionText");
            publish.click();
            browser.sleep(500);
            expect(popup.getAttribute('class')).toMatch('visible');
            expect(popupText.getText()).toBe("On Question 1, an answer does not have any text.");
            dismiss.click();
        });

        it('should error if a correct answer is not selected', function() {
            element.all(by.css('.check-box[ng-click="ms($index)"]')).get(0).click();
            element.all(by.css('.check-box[ng-click="ms($index)"]')).get(1).click();
            publish.click();
            browser.sleep(500);
            expect(popup.getAttribute('class')).toMatch('visible');
            expect(popupText.getText()).toBe("Question 1 does not have an answer selected.");
            dismiss.click();
        });

        it('should allow multiple answers to be selected and published', function() {
            element.all(by.css('.check-box[ng-click="ms($index)"]')).get(0).click();
            element.all(by.css('.check-box[ng-click="ms($index)"]')).get(1).click();
            element.all(by.css('.msText')).get(0).sendKeys("TestAnswer");
            element.all(by.css('.msText')).get(1).sendKeys("TestAnswer");
            element.all(by.css('.msText')).get(2).sendKeys("TestAnswer");
            publish.click();
            expect(popup.getAttribute('class')).toNotMatch('visible');
        });

        it('should increase answers options when button is pressed', function() {
            element.all(by.css('[ng-click="addOption()"]')).get(1).click();
            element.all(by.css('.msText')).then(function(elements) {
                expect(elements.length).toBe(4);
            });   
        });
        
        it('should not be able to add more than 6 options (max)', function() {
            element.all(by.css('[ng-click="addOption()"]')).get(1).click();
            element.all(by.css('[ng-click="addOption()"]')).get(1).click();
            expect(element.all(by.css('[ng-click="addOption()"]')).get(1).getAttribute('class')).toMatch("ng-hide");
        });
    });

    it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });
});