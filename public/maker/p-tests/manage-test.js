describe('manage quiz', function() {
    it('login', function() {
        browser.get('http://localhost:3000/logout');
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();
        browser.get('http://localhost:3000/maker');
    });

    it('Should remove ng-hide class from live div when clicked and applies ng-hide to finished, scheduled and drafts divs', function() {
        element(by.id("liveTab")).click();
        expect(element(by.css("#live")).isDisplayed()).toBeTruthy();
        expect(element(by.css("#finished")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#scheduled")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#drafts")).isDisplayed()).toBeFalsy();
    });

    it('Should remove ng-hide class from finished div when clicked and applies ng-hide to live, scheduled and drafts divs', function() {
        element(by.id("finishedTab")).click();
        expect(element(by.css("#live")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#finished")).isDisplayed()).toBeTruthy();
        expect(element(by.css("#scheduled")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#drafts")).isDisplayed()).toBeFalsy();
    });

    it('Should remove ng-hide class from scheduled div when clicked and applies ng-hide to live, finished and drafts divs', function() {
        element(by.id("scheduledTab")).click();
        expect(element(by.css("#live")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#finished")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#scheduled")).isDisplayed()).toBeTruthy();
        expect(element(by.css("#drafts")).isDisplayed()).toBeFalsy();
    });

    it('Should remove ng-hide class from drafts div when clicked and applies ng-hide to live, scheduled and finished divs', function() {
        element(by.id("draftsTab")).click();
        expect(element(by.css("#live")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#finished")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#scheduled")).isDisplayed()).toBeFalsy();
        expect(element(by.css("#drafts")).isDisplayed()).toBeTruthy();
    });

    it('logout', function() {
        browser.get('http://localhost:3000/logout');
    });
});