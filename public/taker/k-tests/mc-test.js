'use strict';

describe('Question Directive', function() {
    var $scope, element;

    beforeEach(module('app'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();

        element = '<question text="text" name="name" type="type" selected="selected"></question>';

        $scope.text = "What is yo name?";
        $scope.name = "Get to know you";
        $scope.type = "mc";
        $scope.selected = null;
        element = $compile(element)($scope);

        $scope.$apply();
        $scope.$digest();
    }));

    it('scope.name is passed in properly', inject(function($controller) {
        expect(element.children()[0].innerHTML).toBe($scope.name);
    }));

    it('scope.text is passed in properly', inject(function($controller) {
        expect(element.children()[2].innerHTML).toBe($scope.text);
    }));

});