var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
        .when("/", {
            controller: "dashboard",
            templateUrl: "views/dashboard.html"
        })
        .when("/quiz/", {
            controller: "quiz",
            templateUrl: "views/quiz.html"
        })
        .when("/results", {
            controller: "results",
            templateUrl: "views/results.html"
        })
        .otherwise("/");
}]);