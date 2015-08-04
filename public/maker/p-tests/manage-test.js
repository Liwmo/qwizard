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

    it('Should display closed quizzes with title, date, completion percentage, number of participants and total employees', function() {
        var httpBackendMock = function(){
            angular.module('httpBackendMock', ['ngMockE2E', 'app'])
                .run(function($httpBackend) {

                $httpBackend.whenGET('/api/maker/manage/finished').respond(function(method, url, data, headers) {
                    return [200, [{publish: '2015-01-01T06:00:00.000Z', results: '2015-02-01T06:00:00.000Z', title: 'Mock Quiz', id: 1, employees: 80}], {}];
                });

                $httpBackend.whenGET('/api/maker/manage/totalEmployees').respond(function(method, url, data, headers) {
                    return [200, [{num: 100}], {}];
                });

                $httpBackend.whenGET(/.*/).passThrough();
                $httpBackend.whenPUT(/.*/).passThrough();
                $httpBackend.whenPOST(/.*/).passThrough();
             });
        };

        browser.addMockModule('httpBackendMock', httpBackendMock);
        browser.get('http://localhost:3000/maker');
        element(by.id("finishedTab")).click();

        expect(element(by.css('.quizName')).getText()).toEqual("Mock Quiz");
        expect(element(by.css('.subText')).getText()).toEqual("January 1 - February 1");
        expect(element(by.css('.percent')).getText()).toEqual("80%");
        expect(element(by.css('.employee-count')).getText()).toEqual("80/100 employees");



        browser.removeMockModule('httpBackendMock');
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