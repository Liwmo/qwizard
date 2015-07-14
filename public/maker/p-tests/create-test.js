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
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(3).getAttribute('class')).toNotMatch('checked');
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
        expect(element.all(by.css('.radio[ng-click="mc($index)"]')).get(3).getAttribute('class')).toNotMatch('checked');
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

    it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });
});