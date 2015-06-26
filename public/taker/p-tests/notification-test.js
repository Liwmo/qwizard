describe('Quiz Notifications', function() {
	var notification;

  beforeEach(function() {
  	browser.get('http://localhost:3000/taker');
  	notification = element(by.tagName('quiz-notification'));
  })

  it('Should display notifications that can redirect the user to a new view', function() {
    expect(notification.getAttribute("href")).toBeDefined();
  });

  it('Notifications have a close button', function() {
    expect(notification.element(by.css('close'))).toBeDefined();
  });

  it('Notification close button will apply "ng-hide" class', function() {
  	notification.element(by.css('.close')).click();
  	notification.element(by.tagName('a')).getAttribute('class').then(function(str){
  		expect(str.indexOf("ng-hide") > -1).toBe(true);
  	});
  });

  //Note: this assumes a valid notification that will redirect to an existing route
  it('Notification should redirect the page', function() {
  	var dashURL = browser.getLocationAbsUrl();
  	notification.click();
  	expect(browser.getLocationAbsUrl()).toNotBe(dashURL);
  });


});
