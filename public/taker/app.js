var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
        .when("/", {
            controller: "dashboard",
            templateUrl: "taker/views/dashboard.html"
        })
        .when("/quiz/", {
            controller: "quiz",
            templateUrl: "taker/views/quiz.html"
        })
        .otherwise("/");
}]);