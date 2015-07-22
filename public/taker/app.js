var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
        .when("/", {
            controller: "dashboard",
            templateUrl: "views/dashboard.html"
        })
        .when("/quiz/:id", {
            controller: "quiz",
            templateUrl: "views/quiz.html"
        })
        .when("/results/:id", {
            controller: "results",
            templateUrl: "views/results.html"
        })
        .when("/leaderboard", {
            controller: "leaderboard",
            templateUrl: "views/leaderboard.html"
        })
        .when("/info", {
            controller: "info",
            templateUrl: "views/info.html"
        })
        .when("/bug", {
            controller: "bug",
            templateUrl: "views/bug.html"
        })
        .when("/feature", {
            controller: "feature",
            templateUrl: "views/feature.html"
        })
        .when("/myQuizzes", {
            controller: "myQuizzes",
            templateUrl: "views/myQuizzes.html"
        })
        .otherwise("/");
}]);