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

    $scope.thisMonth = function() {
        if(!document.querySelector('#thisMonth').classList.contains('selectedBoard')) {
            document.querySelector('#thisMonth').classList.toggle('selectedBoard');
            document.querySelector('#allTime').classList.toggle('selectedBoard');
        }
    };

    $scope.allTime = function() {
        if(!document.querySelector('#allTime').classList.contains('selectedBoard')) {
            document.querySelector('#thisMonth').classList.toggle('selectedBoard');
            document.querySelector('#allTime').classList.toggle('selectedBoard');
        }
    };

}]);