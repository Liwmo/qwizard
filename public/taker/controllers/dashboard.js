app.controller('dashboard', function($scope) {
    $scope.greeting = "Hello World";

    $scope.notifications = [
        {
            text: "Quiz 235 is ready to take.",
            dest: "#/quiz"
        },
        {
            text: "Results for Quiz 234 have been released. View now >>",
            dest: "#/results"
        }
    ];
    
});
