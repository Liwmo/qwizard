app.directive("leaderboard", function() {
   return {
       restrict: 'E',
       scope: {
          leaders: '=',
          currentUser: '=',
          start: '='
       },
       
       link: function(scope, elem, attr){
           
       },
       templateUrl: '/taker/directives/templates/leaderboard.html'
   };
});
 
