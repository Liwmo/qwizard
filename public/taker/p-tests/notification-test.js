describe('Quiz Notifications', function() {
	var notification;

  beforeEach(function() {
  	browser.get('http://localhost:3000/taker');
  	notification = element(by.css('.purple-dark'));
  });

  it('Should login before running any tests', function() {
    browser.get('http://localhost:3000');
    element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
    element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
    element(by.css('[type="submit"]')).click();
  });

  it('Should display notifications that can redirect the user to a new view', function() {
    expect(notification.getAttribute("href")).toBeDefined();
  });

  it('Notifications have a close button', function() {
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
  	var dashURL = browser.getLocationAbsUrl();
  	notification.click();
  	expect(browser.getLocationAbsUrl()).toNotBe(dashURL);
  });
});
