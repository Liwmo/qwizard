app.directive("quizNotification", ["notificationFactory", function(notificationFactory) {
   return {
       restrict: 'E',
       scope: {
           isEven: '=',
           notification: '='
       },
       
       link: function(scope, elem, attr){
           scope.hide = function($event) {
               $event.preventDefault();
               notificationFactory.removeNotification(scope.notification);
           }
       },
       templateUrl: '/taker/directives/templates/quizNotification.html'
   };
}]);
 
