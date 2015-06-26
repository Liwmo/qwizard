'use strict';

describe('Question Directive', function() {
    var $scope, element;

    beforeEach(module('app'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();

        element = '<question text="text" name="name" type="type" selected="selected" answers="answers"></question>';

        $scope.text = "What is yo name?";
        $scope.name = "Get to know you";
        $scope.type = "tf";
        $scope.selected = [];
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
        expect($scope.selected).toEqual([]);
        var el = angular.element(element.children()[3].children[0]);
        el.triggerHandler('click');
        expect($scope.selected[0]).toBe(0);
    }));

    it('scope.selected should update when multiple schoice is clicked', function(){
        $scope.type = "mc";
        $scope.selected = [];
        $scope.answers = ["1","2","3","4"];
        $scope.$digest();
        angular.element(element.find("span")[0]).triggerHandler("click");
        expect($scope.selected[0]).toEqual(0);
        angular.element(element.find("span")[1]).triggerHandler("click");
        expect($scope.selected[0]).toEqual(1);
        angular.element(element.find("span")[0]).triggerHandler("click");
        expect($scope.selected[0]).toEqual(0);
    });

    it('scope.selected should update when multiple select is clicked', function(){
        $scope.type = "ms";
        $scope.selected = [];
        $scope.answers = ["1","2","3","4"];
        $scope.$digest();
        angular.element(element.find("span")[0]).triggerHandler("click");
        expect($scope.selected).toEqual([0]);
        angular.element(element.find("span")[1]).triggerHandler("click");
        expect($scope.selected).toEqual([0,1]);
        angular.element(element.find("span")[0]).triggerHandler("click");
        expect($scope.selected).toEqual([1]);
    });
});