app.directive("quizNotification", ["notificationFactory", function(notificationFactory) {
   return {
       restrict: 'E',
       scope: {
           isEven: '=',
           notification: '='
       },
       
       link: function(scope, elem, attr){
           scope.isClosed = false;
           scope.hide = function($event) {
               $event.preventDefault();
               notificationFactory.removeNotification(scope.notification);
               scope.isClosed = true;
           }
       },
       templateUrl: '/taker/directives/templates/quizNotification.html'
   };
}]);
 
