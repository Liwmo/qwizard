app.directive("quizNotification", function() {
   return {
       restrict: 'E',
       scope: {
           quizName: '=',
           quizID: '='
       },
       link: function(scope, elem, attr){
           scope.isClosed = false;
           scope.hide = function() {
               this.isClosed = true;
           }
       },
       templateUrl: '/taker/directives/templates/quizNotification.html'
   };
});