describe('Maker authentication', function() {

    describe('While logged in with non-maker account', function() {

        beforeEach(function() {
            browser.get('http://localhost:3000/logout');
            element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
            element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
            element(by.css('[type="submit"]')).click();
        });

        it('Should redirect to the taker page', function() {
            console.log('\n-----------Maker Authentication Suite----------------');
            browser.sleep(200);
            expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/');
        });

        // Test invalid until we handle invalid /maker requests
        // it('Should reject requests for maker', function(){
        //     browser.get('http://localhost:3000/maker');
        // });

    });


});