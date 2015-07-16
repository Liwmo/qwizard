describe('Results page test: ', function() {

        it('Should log in and set up the mocks', function() {
            browser.get('http://localhost:3000/logout');
            browser.get('http://localhost:3000');
            element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
            element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
            element(by.css('[type="submit"]')).click();

            var httpBackendMock = function() {
                angular.module('httpBackendMock', ['ngMockE2E', 'app'])
                  .run(function($httpBackend) {

                    var quiz = '{"title":"WWT Employee Handbook","questions":[{"name":"Benefits","type":"mc","text":"Open enrollment for Health Insurance takes place annually in what month?","answers":["September","October","November","December"]},{"name":"Benefits","type":"mc","text":"How much will WWT reimburse for the pursuit of a degree?","answers":["25%","50%","75%","10%"]},{"name":"Benefits","type":"mc","text":"WWTHC will match employee 401K contributions dollar for dollar up to what percent?","answers":["5%","6%","7%","8%"]},{"name":"Benefits","type":"mc","text":"How long is the vesting period for WWTHC profit sharing benefit?","answers":["There is no vesting period","1 year","2 years","3 years"]},{"name":"Benefits","type":"mc","text":"WWTHC contributions to employee 401k plans, and any earnings they generate are fully vested after how many years?","answers":["2 years","3 years","4 years","5 years"]},{"name":"Benefits","type":"mc","text":"Annual profit sharing is based on:","answers":["Annual Net Income","Entire Base Payroll","Individual Salary","All of these"]},{"name":"Policies","type":"tf","text":"You can use the WWT logo on social media","answers":[]},{"name":"Policies","type":"ms","text":"Sexual harassment includes:","answers":["Requests for sexual acts or favors","Verbal or physical conduct of sexual nature","Telling your significant other that you love them on company premises"]},{"name":"Policies","type":"tf","text":"WWT considers flip flops to be appropriate office attire.","answers":[]},{"name":"Policies","type":"tf","text":"WWT mandates good hygiene to prevent spread of infectous diseases:","answers":[]},{"name":"Policies","type":"tf","text":"Having any form of weapon on company property (including parking lots) is grounds for termination","answers":[]},{"name":"Naming Executives","type":"mc","text":"Who can approve contribution requests?","answers":["Rocky Balboa","Ann Marr","Steve Irwin","Caitlyn Jenner"]},{"name":"Naming Executives","type":"mc","text":"Who is the vice president of HR for WWTHC?","answers":["Ann Marr","Joe Biden","Rachel Jones","Dave Anderson"]},{"name":"Naming Executives","type":"mc","text":"Who shouldn’t you go to in order to get Advertising expenses pre-approved?","answers":["Bob Owling","Joe Koenig","Dave Elfanbaum"]},{"name":"WWT Principles","type":"mc","text":"What is the company’s core values acronym?","answers":["The Oath","The Path","The Way","The Truth"]},{"name":"WWT Principles","type":"mc","text":"Which of the following is not part of THE PATH?","answers":["Team Player","Trust","Passion","Health"]},{"name":"WWT Principles","type":"mc","text":"Which of the following is not a quality objective?","answers":["Increase customer satisfaction","Reduce cycle times","Increase on-time delivery of products and services","Create the perfect program"]},{"name":"WWT Principles","type":"mc","text":"Which of the following is not a quality objective?","answers":["Increase customer satisfaction","Reduce cycle times","Reduce nonconformance customer issues and reworks","Increase employee satisfaction"]},{"name":"Time Out","type":"mc","text":"How many days of accrued PTO can be carried over to the following calendar year?","answers":["5","10","14","15"]},{"name":"Time Out","type":"mc","text":"At least how many days in advance should you schedule PTO?","answers":["5","10","14","15"]},{"name":"Time Out","type":"tf","text":"New employees receive 2 weeks of paid time off per year","answers":[]},{"name":"Time Out","type":"mc","text":"At what point does an employee’s accrual of paid time off cease?","answers":["30 Days","60 Days","90 Days","120 Days"]},{"name":"Time Out","type":"mc","text":"How many days off are granted for Thanksgiving?","answers":["1","2","3","none"]},{"name":"Time Out","type":"mc","text":"Which of the following is not a paid holiday?","answers":["Memorial Day","Independence Day","Labor Day","St. Patrick\'s Day"]},{"name":"Time Out","type":"tf","text":"Maternity and Paternity leave are the same","answers":[]},{"name":"Time Out","type":"ma","text":"Matching: After one year of employment:","answers":["Sick Leave = 6 weeks","Jury Duty = 15 days","Paternity Leave = 5 days","Adoption Leave = 3 weeks"]},{"name":"Miscellaneous","type":"mc","text":"What does WWTHC stand for?","answers":["World Wide Technology Holding Company","World Wide Technology Heralding Ceremony","World Wide Technology Handling Company"]},{"name":"Miscellaneous","type":"mc","text":"An employee referral can be worth up to:","answers":["$100","$500","$1,000","$2,000"]},{"name":"Miscellaneous","type":"tf","text":"If the office closes due to weather, salaried employees will still be paid as normal","answers":[]},{"name":"Miscellaneous","type":"tf","text":"All newly hired employees will be required to pass a drug screening as a condition of employment","answers":[]},{"name":"Miscellaneous","type":"ms","text":"What could disqualify someone’s consideration for telecommuting?","answers":["The home workplace isn\'t free of distraction","The employee has been disciplined in the past","The employee has a known problem with maintaining attendance","The employee has worked for WWTHC only 90 days"]}]}';
                    var results = {"answers": "[[2], [1], [1], [0], [3], [3], [1], [0, 1], [0], [1], [0], [1], [0], [2], [1], [3], [3], [3], [0], [1], [1], [2], [1], [3], [1], [], [0], [3], [0], [0], [0, 1, 2]]","selected": "[{\"answer\":[2]},{\"answer\":[2]},{\"answer\":[1]},{\"answer\":[3]},{\"answer\":[1]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[2]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[3]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[2]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[3]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[3]},{\"answer\":[]},{\"answer\":[]},{\"answer\":[3]}]"};
                    var points = JSON.stringify([2, 3, 2, 2, 5]);

                    $httpBackend.whenGET('/api/quiz/99999').respond(function(method, url, data, headers) {
                        return [200, quiz, {}];
                    });
                    $httpBackend.whenGET('/api/quiz/99999/results').respond(function(method, url, data, headers) {
                        return [200, results, {}];
                    });
                    $httpBackend.whenGET('/api/quiz/99999/points').respond(function(method, url, data, headers) {
                        return [200, points, {}];
                    });
                    $httpBackend.whenGET('/api/userscore/99999').respond(JSON.stringify({points: 11}));

                    $httpBackend.whenGET(/.*/).passThrough();
                    $httpBackend.whenPOST(/.*/).passThrough();
                 });
            };
            browser.addMockModule('httpBackendMock', httpBackendMock);
        });

        it('Should show correct flag if question is answered correctly', function() {
            browser.get('http://localhost:3000/taker/#/results/99999');
            element(by.css('[ng-click="showAnswers()"]')).click();
            var myElement = element(by.css('.correctFlag'));
            expect(myElement.isPresent()).toBeTruthy();
            expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/results/99999');
        });

        it('Should show point value of correct question in correct flag', function() {

        });

        it('Should show incorrect flag if question is answered incorrectly', function() {

        });
});