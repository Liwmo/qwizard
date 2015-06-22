var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
        .when("/", {
            controller: "home",
            templateUrl: "views/home.html"
        })
        .when("/quiz/:quiz", {
            controller: "quiz",
            templateUrl: "views/quiz.html"
        })
        .otherwise("/");
}]);