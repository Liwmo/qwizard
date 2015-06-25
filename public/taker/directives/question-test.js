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
        $scope.type = "tf";
        $scope.selected = null;
        element = $compile(element)($scope);

        $scope.$digest();

    }));

    it('scope.name is passed in properly', inject(function($controller) {
        expect(element.children()[0].innerHTML).toBe($scope.name);
    }));

    it('scope.text is passed in properly', inject(function($controller) {
        expect(element.children()[2].innerHTML).toBe($scope.text);
    }));

    it('scope.type is templated correctly when tf', inject(function($controller) {
        expect(element.children()[3].children.length).toBe(2);
        expect(element.children()[3].children[0].innerHTML).toBe("True");
        expect(element.children()[3].children[1].innerHTML).toBe("False");
    }));

    it('scope.selected should update when true is clicked', inject(function($controller){
        expect($scope.selected).toBe(null);
        var el = angular.element(element.children()[3].children[0]);
        el.triggerHandler('click');
        expect($scope.selected).toBe(true);
    }));

    // it('scope.type is templated correctly when mc', inject(function($controller, $compile) {
    //     $scope.type = "mc";
    //     element = $compile(element)($scope);
    //     console.log(element.children());
    //     $scope.$digest();
    //     expect(element.children()[3].children.length).toBe(3);
    //     expect(element.children()[3].children[0].innerHTML.innerHTML).toBe("pizza");
    //     expect(element.children()[3].children[1].innerHTML.innerHTML).toBe("sushi");
    //     expect(element.children()[3].children[2].innerHTML.innerHTML).toBe("taco");
    // }));
});