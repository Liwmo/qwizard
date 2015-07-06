describe('Qwizard Homepage', function() {

	it ("Should not allow browsing directly to any taker webpage", function() {

		var url = 'http://localhost:3000/taker/#/';
		browser.get(url);
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toNotBe(url);
	});

	it ("Should redirect to login when attempting to browse without logging in", function() {
		browser.get("http://localhost:3000/taker/#/quiz");
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toBe("http://localhost:3000/");
	});

	it ("Should not allow invalid credentials", function() {
		browser.get('http://localhost:3000');
		browser.sleep(500);
		element(by.css('[type="text"]')).sendKeys('blah_not_a_real_user');
		element(by.css('[type="password"]')).sendKeys('blah_not_a_real_password');
		element(by.css('[type="submit"]')).click();
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toNotBe('http://localhost:3000/taker/#/');
	});
  // it('should have a submit button', function() {
  	
  // 	//Use this for any pages that don't have angular
  // 	browser.ignoreSynchronization = true;

  	
  //   browser.get('http://localhost:3000/');
  //   element(by.css('[type="submit"]')).click();
  // });
});
