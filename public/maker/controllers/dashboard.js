app.controller('dashboard', ['$scope', 'userFactory', function($scope, userFactory) {
    $scope.greeting = "Hello, you are on the maker dashboard!!!";

    $scope.toggleMenu = function() {
      console.log('toggleMenu called');
      document.querySelector('#drawer').classList.toggle('visible');
    }
}]);
