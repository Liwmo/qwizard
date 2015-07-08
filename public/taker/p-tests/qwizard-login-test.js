describe('Qwizard Homepage', function() {

	it ("Should not allow browsing directly to any taker webpage", function() {
		var url = 'http://localhost:3000/taker/#/';
		browser.get(url);
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toNotBe(url);
	});

	it ("Should redirect to login when attempting to browse without logging in", function() {
		browser.get("http://localhost:3000/maker");
		browser.sleep(200);
		expect(browser.getCurrentUrl()).toBe("http://localhost:3000/");
	});

	it ("Should not allow invalid credentials", function() {
		browser.get('http://localhost:3000');
		element(by.css('[type="text"]')).sendKeys('blah_not_a_real_user');
		element(by.css('[type="password"]')).sendKeys('blah_not_a_real_password');
		element(by.css('[type="submit"]')).click();
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toNotBe('http://localhost:3000/taker/#/');
	});

	it ("Should show error message when credentials are bad", function() {
		expect(element(by.css("#error")).isPresent()).toBe(true);
	});

	it ("Should not accept blank password and/or username", function() {
		browser.get('http://localhost:3000');
		//No username
		element(by.css('[type="password"]')).sendKeys('blah_not_a_real_password');
		element(by.css('[type="submit"]')).click();
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toNotBe('http://localhost:3000/taker/#/');
		expect(element(by.css("#error")).isPresent()).toBe(true);

		//No Password
		browser.get('http://localhost:3000');
		element(by.css('[type="text"]')).sendKeys('blah_not_a_real_user');
		element(by.css('[type="submit"]')).click();
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toNotBe('http://localhost:3000/taker/#/');
		expect(element(by.css("#error")).isPresent()).toBe(true);

		//No Username/Password
		browser.get('http://localhost:3000');
		element(by.css('[type="submit"]')).click();
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toNotBe('http://localhost:3000/taker/#/');
		expect(element(by.css("#error")).isPresent()).toBe(true);
	});

	it ("Should allow valid credentials to login", function() {
		browser.get('http://localhost:3000');
		//Valid username
		element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
		element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
		element(by.css('[type="submit"]')).click();
		browser.sleep(500);
		expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/');
	});

	it ("Should redirect to login after logging out", function() {
		browser.get('http://localhost:3000/logout');
		browser.sleep(200);
		expect(browser.getCurrentUrl()).toBe('http://localhost:3000/');
	});

	it ("Should not be able to go to any urls after logging out", function() {
		browser.get('http://localhost:3000/taker');
		browser.sleep(200);
		expect(browser.getCurrentUrl()).toNotBe('http://localhost:3000/taker/#/');
	});
});
