'use strict';

describe('quizNotification directive', function() {
    var $scope;
    var element;

    beforeEach(module('app'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();

        element = '<quiz-notification quiz-name="name" quiz-id="id" is-even="even"></quiz-notification>';

        $scope.name = "WWT Quiz";
        $scope.id = "123";
        $scope.even = true;
        element = $compile(element)($scope);
        $scope.$digest();
    }));

    it('should apply the purple-medium class to div when isEven is true', inject(function($controller) {
        expect(element.find("div").hasClass("purple-medium")).toBe(true);
    }));

    it('purple-medium class should not be applied to div when isEven false', inject(function($controller) {
        $scope.even = false;
        $scope.$digest();
        expect(element.find("div").hasClass("purple-medium")).toBe(false);
    }));

    it('should hide when X button is clicked', inject(function($controller) {
        element.find("span").triggerHandler("click");
        expect(element.find("div").hasClass("ng-hide")).toBe(true);
    }));

    it('should properly display quizName', inject(function($controller) {
        expect(element.find("span")[0].innerHTML).toBe("The " + $scope.name + " quiz is waiting!");
    }));
});