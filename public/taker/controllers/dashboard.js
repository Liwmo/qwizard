app.controller('dashboard', function($scope) {
    $scope.greeting = "Hello World";
});

app.directive("specialInput", function(){
    return {
        restrict: 'E',
        scope: {
            default: '='
        },
        template: "<input type='text' ng-model='default'>"
    };
});