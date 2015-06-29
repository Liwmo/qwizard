app.controller('dashboard', ['$scope', 'notificationFactory', 'leaderboardFactory', function($scope, notificationFactory, leaderboardFactory) {
    $scope.greeting = "Hello World";

    $scope.notifications = notificationFactory.getNotifications();

    leaderboardFactory.getLeaders(function(data) {
      $scope.leaders = data.users;
    });

    $scope.currentUser = {
      userid: 507,
    	name: 'me.me',
    	score: 600,
    	rank: 85
    };
}]);
