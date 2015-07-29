'use strict';

describe('quizNotification directive', function() {
    var $scope;
    var element;

    beforeEach(module('app'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();

        element = '<quiz-notification notification="notification" is-even="even"></quiz-notification>';

        $scope.notification = {
            text: "WWT Employee Handbook",
            link: "#/"
        };
        $scope.even = true;

        element = $compile(element)($scope);
        $scope.$digest();
    }));

    it('should apply the purple-medium class to div when isEven is true', inject(function($controller) {
        expect(element.find("a").hasClass("purple-medium")).toBe(true);
    }));

    it('purple-medium class should not be applied to div when isEven false', inject(function($controller) {
        $scope.even = false;
        $scope.$digest();
        expect(element.find("a").hasClass("purple-medium")).toBe(false);
    }));

    it('should properly display quizName', inject(function($controller) {
        expect(element.find("span")[0].innerHTML).toBe($scope.notification.text);
    }));
});