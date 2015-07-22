describe('Quiz Notifications', function() {
  var notification;

  // beforeEach(function() {
  //  notification = element.all(by.css('.notification')).first();
  // });

  it('Should login before running any tests bruh', function() {
    console.log('\n-----------Quiz Notification Suite----------------');
    browser.get('http://localhost:3000/logout');
    browser.get('http://localhost:3000');
    element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
    element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
    element(by.css('[type="submit"]')).click();


    var httpBackendMock = function() {
        angular.module('httpBackendMock', ['ngMockE2E', 'app'])
          .run(function($httpBackend) {
            console.log("inserting our own httpBackend");

            $httpBackend.whenGET('/api/notifications/').respond(function(method, url, data, headers) {
                return [200, [{id: 1, typeID: 1, title: "Title"},{id: 1, typeID: 1, title: "Title"}], {}];
            });

            $httpBackend.whenGET(/.*/).passThrough();
            $httpBackend.whenPOST(/.*/).passThrough();
         });
    };
    browser.addMockModule('httpBackendMock', httpBackendMock);

    browser.get('http://localhost:3000/taker/');
  });

  it('Should display notifications that can redirect the user to a new view', function() {
    notification = element.all(by.css('.notification')).first();
    expect(notification.getAttribute("href")).toBeDefined();
  });

  it('Notifications have a close button', function() {
    notification = element.all(by.css('.notification')).first();
    expect(notification.element(by.css('close'))).toBeDefined();
  });

  it('Notification close button will remove notification from controller/view bruh', function() {
    var numNotifications;
    element.all(by.repeater('notification in notifications')).then(function (notes) {
      numNotifications = notes.length;
    });

    notification.element(by.css('.close')).click();
    element.all(by.repeater('notification in notifications')).then(function (notes) {
      expect(notes.length).toBe(numNotifications-1);
    });

  });

  //Note: this assumes a valid notification that will redirect to an existing route
  it('Notification should redirect the page', function() {
    notification = element.all(by.css('.notification')).first();
  	var dashURL = browser.getLocationAbsUrl();
  	notification.click();
  	expect(browser.getLocationAbsUrl()).toNotBe(dashURL);
  });

  it('should cleanup', function(){
    browser.removeMockModule('httpBackendMock');
    browser.get('http://localhost:3000/logout');
  });
});
