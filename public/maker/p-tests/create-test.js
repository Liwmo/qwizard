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

    it('should show multiple-select span when mc selected', function() {
        expect(element(by.css("[ng-show=\"questionType=='ms'\"]")).getAttribute('class')).toMatch('ng-hide');
        element(by.cssContainingText("option","Multiple Select")).click();
        expect(element(by.css("[ng-show=\"questionType=='ms'\"]")).getAttribute('class')).toNotMatch('ng-hide');
    });

    it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });
});