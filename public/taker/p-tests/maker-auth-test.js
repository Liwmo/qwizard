/**
 * Created by dev1 on 7/6/15.
 */
describe('Maker authentication', function() {

    describe('While logged in with non-maker account', function() {

        beforeEach(function() {
            browser.get('http://localhost:3000/logout');
            element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
            element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
            element(by.css('[type="submit"]')).click();
        });

        it('Should redirect to the taker page', function() {
            expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/');
        });

        it('Should reject requests for maker', function(){
            browser.get('http://localhost:3000/maker');
        });

    });


});