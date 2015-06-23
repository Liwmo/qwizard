app.directive("quizNotification", function() {
   return {
       restrict: 'E',
       scope: {},
       link: function(scope, elem, attr){
           scope.isClosed = false;
           scope.hide = function() {
               this.isClosed = true;
           }
       },
       template: '<div ng-hide="isClosed" ng-show="!isClosed" class="purple-medium notification light-text">' +
                    '<span style="font-size: 1.5em">You have a new quiz waiting!</span>'+
                    '<span class="flex"></span>'+
                    '<span ng-click="hide()" class="close">X</span>'+
                 '</div>'
   };
});