describe('manage quiz', function() {
    beforeEach(function() {
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();
        browser.get('http://localhost:3000/maker');
    });

    it('Should remove ng-hide class from finished div when clicked and applys ng-hide to schedule and drafts divs', function() {
        element(by.id("finished")).click();
        expect(element(by.css("#finished.ng-hide")).getAttribute("class").toBe("categoryView"));
        //expect(element(by.id("scheduled")).getAttribute("class").toBe("categoryView ng-hide"));
        //expect(element(by.id("drafts")).getAttribute("class").toBe("categoryView ng-hide"));



    });


});



/**
 * Created by dev1 on 7/6/15.
 */
// describe('Maker authentication', function() {

//     describe('While logged in with non-maker account', function() {

//         beforeEach(function() {
//             browser.get('http://localhost:3000/logout');
//             element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
//             element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
//             element(by.css('[type="submit"]')).click();
//         });

//         it('Should redirect to the taker page', function() {
//             expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/');
//         })

//     });


// });