app.controller('dashboard', ['$scope', 'notificationFactory', 'leaderboardFactory', 'userFactory', function($scope, notificationFactory, leaderboardFactory, userFactory) {
    $scope.greeting = "Hello World";
    $scope.isMaker = false;
    $scope.currentUser = -1;
    $scope.matches;
    $scope.avgScore;
    $scope.totalQuizzes;
    $scope.username;

    notificationFactory.refreshNotifications(function(data){
        $scope.notifications = data;
    });


    userFactory.getUserId(function(id){
      $scope.currentUser = id;
    });
    //Hope to be refactored into backend one day... I Would be SOOO happy :D
    leaderboardFactory.getLeaders(function(data) {

      // Redirects to login if error in accessing API
      if(data.error) {
            localStorage.error = data.error;
            localStorage.savedRoute = window.location.hash;

            console.log('redirecting from dashboard controller')

            window.location = '/logout';

            return;
      }

      var userIndex = -1;
      for(var i = 0; i < data.users.length; i++) {
        if($scope.currentUser.userid === data.users[i].userid) {
          userIndex = i;
        }
      }
      var min = Math.max(userIndex - 5, 0);
      var max = Math.min(min+10, data.users.length);
      min = Math.max(max - 10, 0);
      var users = [];
      for(var i = min; i < max; i++) {
          users.push(data.users[i]);
      }
      $scope.leaders = users;
      $scope.start = min + 1;
    });

    userFactory.getUserRole(function(data) {
        if(data.role > 0) {
            $scope.isMaker = true;
        }

        console.log('users role: ', data.role, $scope.isMaker);
    });

    userFactory.getUserStats(function(data) {
      if(!data.avgScore) {
        $scope.avgScore = "--";
      }
      else {
        $scope.avgScore = data.avgScore;;
      }
      $scope.matches = data.matches;
      $scope.totalQuizzes = data.totalQuizzes;
    });

    userFactory.getUserName(function(data) {
      if (data.error) {
        $scope.username = data.error;
      }
      else {
        $scope.username = data;
      }
    });

    $scope.toggleMenu = function() {
      console.log('toggleMenu called');
      document.querySelector('#drawer').classList.toggle('visible');
    }
}]);
