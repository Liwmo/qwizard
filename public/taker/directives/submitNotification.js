app.directive("submitNotification", function() {
   return {
       restrict: 'E',
       scope: {
           quizName: '=',
           quizID: '=',
           isEven: '='
       },
       link: function(scope, elem, attr){
           scope.isClosed = true;
           scope.hide = function($event) {
               $event.preventDefault();
               this.isClosed = true;
           };
       },
       templateUrl: '/taker/directives/templates/submitNotification.html'
   };
});