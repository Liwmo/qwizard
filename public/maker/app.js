var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
        .when("/", {
            controller: "dashboard",
            templateUrl: "views/dashboard.html"
        })
        .otherwise("/");
}]);