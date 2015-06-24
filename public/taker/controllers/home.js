app.controller('home', function($scope) {
    $scope.greeting = "Hello World";

    $scope.availableQuizzes = [
        {
            quizName: "Quiz 1",
            quizID: 1
        },
        {
            quizName: "Quiz 2",
            quizID: 2
        },
        {
            quizName: "Quiz 3",
            quizID: 3
        }
    ];
});
