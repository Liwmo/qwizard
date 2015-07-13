describe('manage quiz', function() {
    it('login', function() {
        browser.get('http://localhost:3000/logout');
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();
        browser.get('http://localhost:3000/maker');
    });

    it('Should be able to access the publish quiz view', function() {
        browser.get('http://localhost:3000/maker/#/publish/1');
        expect(browser.getCurrentUrl()).toBe('http://localhost:3000/maker/#/publish/1');
    });

    it('Publish button should redirect to publish quiz view', function() {
        browser.get('http://localhost:3000/maker/#/create');
        element(by.id('quiz_name')).sendKeys("sdfg");
        element(by.css('[ng-model="questionName"]')).sendKeys("$$$$");
        element(by.cssContainingText("option","True/False")).click()
        element(by.css('[ng-model="questionText"]')).sendKeys('$$$$');

        element(by.css('[ng-click="publishQuiz()"]')).click();
        browser.getLocationAbsUrl().then(function(url){
            expect(url.indexOf('/publish')).toNotBe(-1);
        });
    });

    it('logout', function() {
        browser.get('http://localhost:3000/logout');

    });
});