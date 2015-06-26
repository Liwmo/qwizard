app.controller('dashboard', ['$scope', 'notificationFactory', function($scope, notificationFactory) {
    $scope.greeting = "Hello World";

    $scope.notifications = notificationFactory.getNotifications();

    $scope.leaders = [
       {
          name: 'mike.mike',
          score: 9000
       },
       {
       	  name: 'josh.josh',
       	  score: 802
       },
       {
       	  name: 'bill.bill',
       	  score: 801
       },
    ];

    $scope.currentUser = {
    	name: 'me.me',
    	score: 600,
    	rank: 85
    };
}]);
