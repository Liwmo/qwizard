describe('Dashboard', function() {

    describe('Menu Display functionality', function() {

        it ('We need to login before testing anything',function() {
            browser.get('http://localhost:3000/logout');
            element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
            element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
            element(by.css('[type="submit"]')).click();
        });

        it('Menu visibility should change based on width of screen', function() {
            browser.driver.manage().window().setSize(320,480);
            browser.sleep(500);
            expect(element(by.css('#drawer')).isDisplayed()).toBeFalsy();
            browser.driver.manage().window().setSize(600,800);
            browser.sleep(500);
            expect(element(by.css('#drawer')).isDisplayed()).toBeFalsy();
            browser.driver.manage().window().setSize(768,1024);
            browser.sleep(500);
            expect(element(by.css('#drawer')).isDisplayed()).toBeTruthy();
        });

        // Test invalid until we handle invalid /maker requests
        // it('Should reject requests for maker', function(){
        //     browser.get('http://localhost:3000/maker');
        // });

    });


});