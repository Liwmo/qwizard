describe('Qwizard Homepage', function() {
  it('should have a submit button', function() {
  	
  	//Use this for any pages that don't have angular
  	browser.ignoreSynchronization = true;

  	
    browser.get('http://localhost:3000/');
    console.log(element(by.css('[type="submit"]')));
    element(by.css('[type="submit"]')).click();
  });
});
