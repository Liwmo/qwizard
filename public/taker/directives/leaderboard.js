app.directive("leaderboard", function() {
   return {
       restrict: 'E',
       scope: {
          leaders: '=',
          currentUser: '='
       },
       
       link: function(scope, elem, attr){
           
       },
       templateUrl: '/taker/directives/templates/leaderboard.html'
   };
});
 
