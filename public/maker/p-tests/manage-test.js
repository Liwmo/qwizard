describe('manage quiz', function() {
    it('login', function() {
        browser.get('http://localhost:3000/logout');
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();
        browser.get('http://localhost:3000/maker');
    });

    it('Should remove ng-hide class from finished div when clicked and applys ng-hide to schedule and drafts divs', function() {
        element(by.id("finishedTab")).click();
        expect(element(by.css("#finished")).isDisplayed()).toBeTruthy();
        expect(element(by.css("#scheduled")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#drafts")).isDisplayed()).toBeFalsy();
    });

    it('Should remove ng-hide class from scheduled div when clicked and applys ng-hide to finished and drafts divs', function() {
        element(by.id("scheduledTab")).click();
        expect(element(by.css("#finished")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#scheduled")).isDisplayed()).toBeTruthy();
        expect(element(by.css("#drafts")).isDisplayed()).toBeFalsy();
    });

    it('Should remove ng-hide class from drafts div when clicked and applys ng-hide to schedule and finished divs', function() {
        element(by.id("draftsTab")).click();
        expect(element(by.css("#finished")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#scheduled")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#drafts")).isDisplayed()).toBeTruthy();
    });

    it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });
});