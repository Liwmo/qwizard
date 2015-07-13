var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
    $routeProvider
        .when("/", {
            controller: "manager",
            templateUrl: "views/manage-quiz.html"
        })
        .when("/create", {
            controller: "create-quiz",
            templateUrl: "views/create-quiz.html"
        })
        .when("/publish", {
            controller: "publish-quiz",
            templateUrl: "views/publish-quiz.html"
        })
        .otherwise("/");
}]);