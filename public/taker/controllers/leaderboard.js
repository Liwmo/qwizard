app.controller('leaderboard', ['$scope', 'leaderboardFactory', function($scope, leaderboardFactory) {
    var allTime, monthly, weekly;
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
        
        allTime = users;
        $scope.leaders = allTime;
        $scope.start = 1;
    });

    leaderboardFactory.getMonthly(function(data) {
        if (!data.error) {
            var users = [];
            for(var i = 0; i < data.users.length; i++) {
                users.push(data.users[i]);
            }

            monthly = users; 
        }   
    });
    
    leaderboardFactory.getWeekly(function(data) {
        if (!data.error) {
            var users = [];
            for(var i = 0; i < data.users.length; i++) {
                users.push(data.users[i]);
            }

            weekly = users; 
        }   
    });

    $scope.selectedBoard = 1;
    $scope.leaders = allTime;
    $scope.start = 1;

    $scope.toggleBoard = function(tab) {
        $scope.selectedBoard = tab;
        if($scope.selectedBoard == 1) {
            $scope.leaders = allTime;
        } else if($scope.selectedBoard == 2) {
            $scope.leaders = monthly;
        } else {
            $scope.leaders = weekly;
        }
    };

    
}]);