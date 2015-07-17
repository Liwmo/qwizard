'use strict';

describe('Question Directive', function() {
    var $scope, element;

    beforeEach(module('app'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();

        element =  '<maker-question question-text="text" '+
                                   'question-name="name" '+
                                   'question-type="type" '+
                                   'correct-answer="correct"'+
                                   'possible-answers="possible"'+
                                   'index="index"'+
                                   'max="max"'+
                                   'maxed-out="maxedOut">'+
                    '</maker-question>';

        $scope.name = "Get to know you";
        $scope.type = "tf";
        $scope.text = "";
        $scope.correct = [];
        $scope.possible = ["","",""];
        $scope.max = 6;
        element = $compile(element)($scope);

        $scope.$digest();

    }));

    it('scope.name is passed in properly', inject(function($controller) {
        expect(element.children()[0].children[0].value).toBe($scope.name);
    }));

    it('scope.text is passed back out properly when editted', inject(function($controller) {
        element.children()[0].children[2].innerHTML = "What yo name, shaw-day?";
        expect(element.children()[0].children[2].value).toBe($scope.text);
    }));

    it('scope.type is templated correctly when tf', inject(function($controller) {
        expect(element.children()[1].classList).toMatch("ng-hide");
        expect(!element.children()[2].classList.contains("ng-hide"));
    }));

    //TODO: finish writing tests for maker-question directive.

    
    // it('scope.selected should update when true is clicked', inject(function($controller){
    //     expect($scope.selected).toEqual([]);
    //     var el = angular.element(element.children()[4].children[0]);
    //     el.triggerHandler('click');
    //     expect($scope.selected[0]).toBe(0);
    // }));

    // it('scope.selected should update when multiple schoice is clicked', function(){
    //     $scope.type = "mc";
    //     $scope.selected = [];
    //     $scope.answers = ["1","2","3","4"];
    //     $scope.$digest();
    //     angular.element(element.find("span")[0]).triggerHandler("click");
    //     expect($scope.selected[0]).toEqual(0);
    //     angular.element(element.find("span")[1]).triggerHandler("click");
    //     expect($scope.selected[0]).toEqual(1);
    //     angular.element(element.find("span")[0]).triggerHandler("click");
    //     expect($scope.selected[0]).toEqual(0);
    // });

    // it('scope.selected should update when multiple select is clicked', function(){
    //     $scope.type = "ms";
    //     $scope.selected = [];
    //     $scope.answers = ["1","2","3","4"];
    //     $scope.$digest();
    //     angular.element(element.find("span")[0]).triggerHandler("click");
    //     expect($scope.selected).toEqual([0]);
    //     angular.element(element.find("span")[1]).triggerHandler("click");
    //     expect($scope.selected).toEqual([0,1]);
    //     angular.element(element.find("span")[0]).triggerHandler("click");
    //     expect($scope.selected).toEqual([1]);
    // });

    // it('scope.selected should update when multiple select is clicked to sorted order', function(){
    //     $scope.type = "ms";
    //     $scope.selected = [];
    //     $scope.answers = ["1","2","3","4"];
    //     $scope.$digest();
    //     angular.element(element.find("span")[1]).triggerHandler("click");
    //     expect($scope.selected).toEqual([1]);
    //     angular.element(element.find("span")[0]).triggerHandler("click");
    //     expect($scope.selected).toEqual([0,1]);
    //     angular.element(element.find("span")[0]).triggerHandler("click");
    //     expect($scope.selected).toEqual([1]);
    // });
});