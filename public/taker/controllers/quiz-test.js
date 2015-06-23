/**
 * Created by dev1 on 6/23/15.
 */
'use strict';

describe('Quiz view', function() {
    var $scope;

    beforeEach(module('app'));
    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('quiz', {$scope: $scope});
    }));

    it('Should have scope.name', inject(function($controller) {
        expect($scope.name).toBe("WWT Quiz");
    }));
});