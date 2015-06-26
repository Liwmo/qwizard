app.controller('dashboard', ['$scope', 'notificationFactory', function($scope, notificationFactory) {
    $scope.greeting = "Hello World";

    $scope.notifications = notificationFactory.getNotifications();
}]);
