describe('info page', function() {
	var notification;

  beforeEach(function() {
  	browser.get('http://localhost:3000');
  });

  it('Should login before running any tests bruh', function() {
    browser.get('http://localhost:3000/logout');
    browser.get('http://localhost:3000');
    element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
    element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
    element(by.css('[type="submit"]')).click();
  });

  it('the menu should contain an info button', function() {
    expect(element(by.css('#drawer a[href="#/info"]'))).toBeDefined();
  });

  it('the user should be navigated to /#/info after clicking info button', function() {
    element(by.css('#main-content .toolbar .button')).click();
    //Animate Menu
    browser.sleep(500);
    element(by.css('#drawer a[href="#/info"]')).click();
    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/info');
  });
});
