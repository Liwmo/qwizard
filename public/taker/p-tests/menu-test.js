describe('Menu bar: ', function() {
	var visible = false;

	it('Should login before running any tests', function() {
	    browser.get('http://localhost:3000/logout');
	    browser.get('http://localhost:3000');
	    element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
	    element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
	    element(by.css('[type="submit"]')).click();
	    browser.sleep(500);
	    element(by.css("#drawer")).isDisplayed().then(function(isDisplayed){
	    	console.log(isDisplayed);
	    });
  	});

	it('the user should be navigated to /#/info after clicking info button', function() {
	    element(by.css('#drawer a[href="#/info"]')).click();
	    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/info');
	});

});