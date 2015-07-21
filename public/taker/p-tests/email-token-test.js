describe('Email Tokens', function() {

   var token = "THISISMYFREAKINGTOKEN";
   
  it('Should login before running any tests bruh', function() {
    console.log('\n-----------Email Tokens Suite----------------');
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:3000/logout');
    browser.get('http://localhost:3000');
    element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
    element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
    element(by.css('[type="submit"]')).click();
    browser.sleep(500);
    browser.get('http://localhost:3000/tests/addEmailToken/' + token);
    browser.get('http://localhost:3000/logout');
    browser.get('http://localhost:3000/verify/' + token + '?redirect=/taker');
    browser.sleep(500);
    expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/');
    browser.sleep(500);
  });

  it('should no longer be a valid token after it is used once', function(){
    browser.get('http://localhost:3000/verify/' + token + '?redirect=/taker');
    browser.sleep(500);
    expect(browser.getCurrentUrl()).toNotBe('http://localhost:3000/taker/#/');
  });

  it('should logout', function(){
    browser.get('http://localhost:3000/logout');
    browser.ignoreSynchronization = false;
  });
});
