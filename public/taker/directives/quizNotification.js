app.directive("quizNotification", function() {
   return {
       restrict: 'E',
       scope: {
           quizName: '=',
           quizID: '=',
           isEven: '='
       },
       link: function(scope, elem, attr){
           scope.isClosed = false;
           scope.hide = function($event) {
               $event.preventDefault();
               this.isClosed = true;
           }
       },
       templateUrl: '/taker/directives/templates/quizNotification.html'
   };
});