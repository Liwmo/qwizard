describe('Menu bar: ', function() {
	var visible = false;
	var openMenu = function() {
		element(by.css('.icon.menu')).isDisplayed().then(function(isDisplayed){
		    if(isDisplayed) {
		    	element(by.css('.icon.menu')).click();
		    	browser.sleep(500);
		    }
	    });
	};

	beforeEach(function(){
		browser.get('http://localhost:3000');
	});

	it('Should login before running any tests', function() {
	    browser.get('http://localhost:3000/logout');
	    browser.get('http://localhost:3000');
	    element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
	    element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
	    element(by.css('[type="submit"]')).click();
  	});

	// TODO: These two tests are for buttons not yet implemented. Uncomment and fix when needed! 
 	//  it('the user should be navigated to /#/stats after clicking stats button', function() {
	// 	openMenu();
	//     element(by.css('a[href="#/stats"]')).click();
	//     expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/stats');
	// });

	// it('the user should be navigated to /#/quizzes after clicking quizzes button', function() {
	// 	openMenu();
	//     element(by.css('#a[href="#/quizzes"]')).click();
	//     expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/quizzes');
	// });

	it('the user should be navigated to /#/manage after clicking manage button', function() {
		openMenu();
	    element(by.css('a[href="/maker"]')).click();
	    browser.sleep(100);
	    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/maker/#/');
	});

	it('the user should be navigated to /#/create after clicking create button', function() {
		openMenu();
	    element(by.css('a[href="/maker/#/create"]')).click();
	    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/maker/#/create');
	});

	it('the user should be navigated to /#/leaderboard after clicking leaderboard button', function() {
		openMenu();
	    element(by.css('a[href="#/leaderboard"]')).click();
	    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/leaderboard');
	});

	it('the user should be navigated to /#/info after clicking info button', function() {
		openMenu();
	    element(by.css('a[href="#/info"]')).click();
	    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/info');
	});

	it('the user should be navigated to /#/logout after clicking logout button', function() {
		openMenu();
	    element(by.css('a[href="/logout"]')).click();
	    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/');
	});

});