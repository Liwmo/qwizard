describe('Manage quiz - Publish: ', function() {
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
        element(by.id('quiz_name')).sendKeys("Test Quiz Name");
        element(by.css('[ng-model="questionName"]')).sendKeys("Test Question Name");
        element(by.cssContainingText("option","True/False")).click()
        element(by.css('[ng-model="questionText"]')).sendKeys('Test question text');

        element(by.css('[ng-click="publishQuiz()"]')).click();
        browser.getLocationAbsUrl().then(function(url){
            expect(url.indexOf('/publish')).toNotBe(-1);
        });
    });

    it('Should redirect to /create if there is no quiz already in progress', function() {

    });

    //  TODO: waiting for API endpoint to implement 
    // it('Should display quiz name at the top', function() {
    //     expect(element(by.name('quiz-name')).getText()).toBe('Test Quiz Name');
    // });

    it('Should error on publish if there is no start or end date set', function() {
        element(by.name('publish')).click();
        expect(element(by.css('.popup')).getAttribute('class')).toMatch('visible');
        browser.sleep(1000);
        element(by.css('[ng-click="leftAction()"]')).click();
    });

    it('Should error on publish if start date is a past date', function() {
        element(by.name('start-date')).sendKeys('07-01-2015');
        element(by.name('publish')).click();
        expect(element(by.css('.popup')).getAttribute('class')).toMatch('visible');
        browser.sleep(1000);
        element(by.css('[ng-click="leftAction()"]')).click();
    });

    it('Should error on publish if end date is earlier than start date', function() {
        element(by.name('start-date')).sendKeys('07-02-2015');
        element(by.name('end-date')).sendKeys('07-01-2015');
        element(by.name('publish')).click();
        expect(element(by.css('.popup')).getAttribute('class')).toMatch('visible');
        browser.sleep(1000);
        element(by.css('[ng-click="leftAction()"]')).click();
    });

    it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });
});