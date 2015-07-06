app.controller('leaderboard', ['$scope', 'leaderboardFactory', function($scope, leaderboardFactory) {
    leaderboardFactory.getLeaders(function(data) {

        // Redirects to login if error in accessing API
        if (data.error) {
            localStorage.error = data.error;
            localStorage.savedRoute = window.location.hash;

            console.log('redirecting from leaderboard controller');

            window.location = '/logout';

            return;
        }

        var users = [];
        for(var i = 0; i < data.users.length; i++) {
            users.push(data.users[i]);
        }
        $scope.leaders = users;
        $scope.start = 1;
    });

    $scope.selectedBoard = 1;

    $scope.toggleBoard = function(tab) {
        $scope.selectedBoard = tab;
    };

}]);