describe('quiz-test: ', function() {

    var dragDrop  = function(from, to, fromIndex, toIndex){
        var from = element.all(by.css(from)).get(fromIndex || 0);
        var to = element.all(by.css(to)).get(toIndex || 0);
        browser.actions()
            .mouseDown(from)
            .mouseMove(to)
            .mouseUp()
            .perform();
    };

    beforeEach(function() {
        browser.get('http://localhost:3000/logout');
        browser.get('http://localhost:3000');
        element(by.css('[type="text"]')).sendKeys('proj-1189-bind');
        element(by.css('[type="password"]')).sendKeys('OEHss$4r$mHb^j');
        element(by.css('[type="submit"]')).click();

        var httpBackendMock = function() {
            angular.module('httpBackendMock', ['ngMockE2E', 'app'])
              .run(function($httpBackend) {
                var quiz = '[{"type":"tf","text":"Kitteh?<img src=\\"http://s3.amazonaws.com/rapgenius/cats-animals-kittens-background.jpg\\">",';
                quiz += '"answers":["","",""],"name":"photo question"},{"type":"mc","text":"How do you skin a cat?","answers":';
                quiz += '["Very carefully","With the rage of a thousand suns","No."],';
                quiz += '"name":"Multiple Choice"},{"type":"ms","text":"Which two rappers have been shot?","answers":["Biggie Smalls","50 Cent","Warren-G"],"name":"Multiple Select"},';
                quiz += '{"type":"ma","text":"Match the intern with their last names","answers":["Schmidt:Mike","Isa:Nicole","Fanger:Eyad","Kiser:Devin"],"name":"Matching"},'
                quiz += '{"type":"pm","text":"Match the photos","answers":["1001402:FirstPerson","1001403:SecondPerson","1001404:FourthPerson","1001405:ThirdPerson"],"name":"Photo Matching"}]';
                var meta = {
                    "answers": " [[[0],[1],[1],[0,1],[\"Schmidt:Nicole\",\"Isa:Eyad\",\"Fanger:Mike\",\"Kiser:Devin\"]] ",
                    "pointvalues" : "[10,10,10,10,10]"
                };
                $httpBackend.whenGET('/api/quiz/99999').respond(function(method, url, data, headers) {
                    return [200, {questions: JSON.parse(quiz), title: 'Title', closeDate: '2025-10-10'}, {}];
                });
                $httpBackend.whenPOST('/api/quiz/99999').respond(function(method, url, data, headers) {
                    return [200, {}, {}];
                });

                $httpBackend.whenGET(/.*/).passThrough();
                $httpBackend.whenPOST(/.*/).passThrough();
             });
        };
        browser.addMockModule('httpBackendMock', httpBackendMock);

        browser.get('http://localhost:3000/taker/#/quiz/99999');
    });

    afterEach(function() {
        browser.removeMockModule('httpBackendMock');
        browser.get('http://localhost:3000/logout');
    });

    it('Should make sure that a picture is displayed properly', function() {
        console.log('\n-----------Quiz Test Suite----------------');
        element.all(by.css('question > div > img')).then(function(images){
            expect(images.length).toBe(1);
        });
    });

    it('Should be able to change values on a true/false question', function() {
        element.all(by.css("[ng-click='tf(0)']")).get(0).click();
        expect(element.all(by.css("[ng-click='tf(0)']")).get(0).getAttribute('class')).toMatch('selected');
        expect(element.all(by.css("[ng-click='tf(1)']")).get(0).getAttribute('class')).not.toMatch('selected');
        element.all(by.css("[ng-click='tf(1)']")).get(0).click();
        expect(element.all(by.css("[ng-click='tf(0)']")).get(0).getAttribute('class')).not.toMatch('selected');
        expect(element.all(by.css("[ng-click='tf(1)']")).get(0).getAttribute('class')).toMatch('selected');
    });

    it('Should be able to select only one value at a time from a multiple choice question', function() {
        element.all(by.css("[ng-click='next()']")).get(0).click();

        element.all(by.css("[ng-click='mc($index)']")).get(0).click();
        expect(element.all(by.css("[ng-click='mc($index)']")).get(0).getAttribute('class')).toMatch('selected');
        expect(element.all(by.css("[ng-click='mc($index)']")).get(1).getAttribute('class')).not.toMatch('selected');
        element.all(by.css("[ng-click='mc($index)']")).get(1).click();
        expect(element.all(by.css("[ng-click='mc($index)']")).get(0).getAttribute('class')).not.toMatch('selected');
        expect(element.all(by.css("[ng-click='mc($index)']")).get(1).getAttribute('class')).toMatch('selected');

    });

    it('Should display instructions on multiple select questions', function() {
        expect(element.all(by.name('msInst')).get(0).getAttribute('class')).toMatch('ng-hide');
        expect(element.all(by.name('msInst')).get(1).getAttribute('class')).toMatch('ng-hide');
        expect(element.all(by.name('msInst')).get(3).getAttribute('class')).toMatch('ng-hide');
        expect(element.all(by.name('msInst')).get(4).getAttribute('class')).toMatch('ng-hide');

        expect(element.all(by.name('msInst')).get(2).getAttribute('class')).not.toMatch('ng-hide');
    });

    it('Should be able to select more than one answer for a multiple select question', function() {
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();

        element.all(by.css("[ng-click='ms($index)']")).get(0).click();
        expect(element.all(by.css("[ng-click='ms($index)']")).get(0).getAttribute('class')).toMatch('selected');
        expect(element.all(by.css("[ng-click='ms($index)']")).get(1).getAttribute('class')).not.toMatch('selected');
        element.all(by.css("[ng-click='ms($index)']")).get(1).click();
        expect(element.all(by.css("[ng-click='ms($index)']")).get(0).getAttribute('class')).toMatch('selected');
        expect(element.all(by.css("[ng-click='ms($index)']")).get(1).getAttribute('class')).toMatch('selected');
    });

    it('Should display instructions on matching and photo matching questions', function() {
        expect(element.all(by.name('maInst')).get(0).getAttribute('class')).toMatch('ng-hide');
        expect(element.all(by.name('maInst')).get(1).getAttribute('class')).toMatch('ng-hide');
        expect(element.all(by.name('maInst')).get(2).getAttribute('class')).toMatch('ng-hide');

        expect(element.all(by.name('maInst')).get(3).getAttribute('class')).not.toMatch('ng-hide');
        expect(element.all(by.name('maInst')).get(4).getAttribute('class')).not.toMatch('ng-hide');
    });

    it('Should be able to put matching questions in drop areas', function() {
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        dragDrop('[ng-drag="true"]', '[ng-drop="true"]');
        expect(element.all(by.css('.clueContainer [ng-drag="true"]')).count()).toBe(1);
    });

    it('should swap answers on a matching field when one is already present', function() {
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        dragDrop('[ng-drag="true"]', '[ng-drop="true"]');
        expect(element.all(by.css('.clueContainer [ng-drag="true"]')).count()).toBe(1);
        dragDrop('[ng-drag="true"]', '[ng-drop="true"]', 1);
        expect(element.all(by.css('.clueContainer [ng-drag="true"]')).count()).toBe(1);
        expect(element.all(by.css('.clueContainer [ng-drag="true"]')).get(0).getText()).toBe("Nicole");
    });

    it('Should be able to perserve all answers made throughout the quiz experience', function() {
        element.all(by.css("[ng-click='tf(0)']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='mc($index)']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='ms($index)']")).get(0).click();
        element.all(by.css("[ng-click='ms($index)']")).get(1).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        dragDrop('[ng-drag="true"]', '[ng-drop="true"]');
        
        element.all(by.css("[ng-click='prev()']")).get(0).click();
        expect(element.all(by.css("[ng-click='ms($index)']")).get(0).getAttribute('class')).toMatch('selected');
        expect(element.all(by.css("[ng-click='ms($index)']")).get(1).getAttribute('class')).toMatch('selected');
        element.all(by.css("[ng-click='prev()']")).get(0).click();
        expect(element.all(by.css("[ng-click='mc($index)']")).get(0).getAttribute('class')).toMatch('selected');
        element.all(by.css("[ng-click='prev()']")).get(0).click();
        expect(element.all(by.css("[ng-click='tf(0)']")).get(0).getAttribute('class')).toMatch('selected');
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        expect(element.all(by.css('.clueContainer [ng-drag="true"]')).get(0).getText()).toBe("Mike");
    });

    it('Should be able to change answers on any question and have those answers saved', function() {
        element.all(by.css("[ng-click='tf(0)']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='mc($index)']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='ms($index)']")).get(0).click();
        element.all(by.css("[ng-click='ms($index)']")).get(1).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        dragDrop('[ng-drag="true"]', '[ng-drop="true"]');
        element.all(by.css("[ng-click='prev()']")).get(0).click();
        element.all(by.css("[ng-click='ms($index)']")).get(0).click();
        element.all(by.css("[ng-click='ms($index)']")).get(2).click();

        expect(element.all(by.css("[ng-click='ms($index)']")).get(0).getAttribute('class')).not.toMatch('selected');
        expect(element.all(by.css("[ng-click='ms($index)']")).get(1).getAttribute('class')).toMatch('selected');
        expect(element.all(by.css("[ng-click='ms($index)']")).get(2).getAttribute('class')).toMatch('selected');
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='prev()']")).get(0).click();
        expect(element.all(by.css("[ng-click='ms($index)']")).get(1).getAttribute('class')).toMatch('selected');
        expect(element.all(by.css("[ng-click='ms($index)']")).get(2).getAttribute('class')).toMatch('selected');
    });

    it('Should render the correct template with images on the photo matching question', function() {
        element.all(by.css('.clue img')).then(function(images){
            expect(images.length).toBe(4);
        });
    });

    it('Should redirect to homepage after submit button is hit', function() {
        element.all(by.css("[ng-click='tf(0)']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='mc($index)']")).get(0).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='ms($index)']")).get(0).click();
        element.all(by.css("[ng-click='ms($index)']")).get(1).click();
        element.all(by.css("[ng-click='next()']")).get(0).click();
        dragDrop('[ng-drag="true"]', '[ng-drop="true"]');
        element.all(by.css("[ng-click='next()']")).get(0).click();
        element.all(by.css("[ng-click='submit()']")).get(0).click();
        expect(browser.getCurrentUrl()).toBe('http://localhost:3000/taker/#/');
    });

});