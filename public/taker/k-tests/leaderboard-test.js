'use strict';

describe('leaderboard directive', function() {
    var $scope;
    var element;

    beforeEach(module('app'));
    beforeEach(module('my.templates'));
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope.$new();

        element = '<leaderboard id="leaderboard" class="flex-container flex vertical" current-user="currentUser" leaders="leaders" start="start"></leaderboard>';

        $scope.currentUser = 507;

        $scope.leaders = [{
          "userid": 500,
          "name": "mike.mike",
          "score": 14
       },
       {
          "userid": 501,
          "name": "josh.josh",
          "score": 13
       },
       {
          "userid": 502,
          "name": "bill.bill",
          "score": 12
       },
       {
          "userid": 503,
          "name": "mike.mike",
          "score": 11
       },
       {
          "userid": 504,
          "name": "josh.josh",
          "score": 10
       },
       {
          "userid": 505,
          "name": "bill.bill",
          "score": 9
       },
       {
          "userid": 506,
          "name": "mike.mike",
          "score": 8
       },
       {
          "userid": 507,
          "name": "me.me",
          "score": 8
       },
       {
          "userid": 508,
          "name": "bill.bill",
          "score": 7
       },
       {
          "userid": 509,
          "name": "mike.mike",
          "score": 6
       },
       {
          "userid": 510,
          "name": "mike.mike",
          "score": 5
       },
       {
          "userid": 511,
          "name": "josh.josh",
          "score": 4
       },
       {
          "userid": 512,
          "name": "bill.bill",
          "score": 3
       },
       {
          "userid": 513,
          "name": "mike.mike",
          "score": 0
       }];

        $scope.start = 3;

        element = $compile(element)($scope);
        $scope.$digest();
    }));

    //Based on the assumption you are using the above data where the current user is in the 7th postion
    it('should apply the highlight class to currentUser', inject(function($controller) {
        expect(element.find("span")[0].children[7].classList.contains("highlight")).toBe(true);
        expect(element.find("span")[1].children[7].classList.contains("highlight")).toBe(true);
        expect(element.find("span")[2].children[7].classList.contains("highlight")).toBe(true);
    }));
});