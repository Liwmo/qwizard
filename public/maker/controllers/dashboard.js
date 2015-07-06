app.controller('dashboard', ['$scope', 'userFactory', function($scope, userFactory) {
    $scope.greeting = "Hello, you are on the maker dashboard!!!";

    // Authenticate users
    //userFactory.getUserRole(function(data) {
    //    console.log('data: ', data);
    //
    //    if(data.error) {
    //        window.location = '/logout';
    //        return;
    //    }
    //
    //    if(data.role < 1) {
    //        window.location = '/taker';
    //    }
    //
    //    console.log('users role: ', data.role);
    //});

    $scope.toggleMenu = function() {
      console.log('toggleMenu called');
      document.querySelector('#drawer').classList.toggle('visible');
    }
}]);
