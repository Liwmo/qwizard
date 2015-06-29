app.controller('dashboard', ['$scope', 'notificationFactory', 'leaderboardFactory', function($scope, notificationFactory, leaderboardFactory) {
    $scope.greeting = "Hello World";

    $scope.notifications = notificationFactory.getNotifications();

    $scope.currentUser = {
      userid: 507,
    	name: 'me.me',
    	score: 600,
    	rank: 85
    };

    //Hope to be refactored into backend one day... I Would be SOOO happy :D
    leaderboardFactory.getLeaders(function(data) {
      var userIndex = -1;
      for(var i = 0; i < data.users.length; i++) {
        if($scope.currentUser.userid === data.users[i].userid) {
          userIndex = i;
        }
      }
      var min = Math.max(userIndex - 5, 0);
      var max = Math.min(min+10, data.users.length - 1);
      min = max - 10;
      var users = [];
      for(var i = min; i < max; i++) {
          users.push(data.users[i]);
      }
      $scope.leaders = users;
      $scope.start = min + 1;
    });

    $scope.toggleMenu = function() {
      console.log('toggleMenu called');
      document.querySelector('#drawer').classList.toggle('visible');
    }
}]);
