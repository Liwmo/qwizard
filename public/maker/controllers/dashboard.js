app.controller('dashboard',  ['$scope', 'userFactory', function($scope, userFactory) {
    
	$scope.isMaker = false;
	$scope.currentUser = -1;
  $scope.username = "";

    $scope.toggleMenu = function() {
      console.log('toggleMenu called');
      document.querySelector('#drawer').classList.toggle('visible');
    }

    userFactory.getUserId(function(id){
      $scope.currentUser = id;
    });

    userFactory.getUserRole(function(data) {
        if(data.role > 0) {
            $scope.isMaker = true;
        }

        console.log('users role: ', data.role, $scope.isMaker);
    });

    userFactory.getUserName(function(data) {
      if (data.error) {
        $scope.username = data.error;
      }
      else {
        $scope.username = data;
      }
    });

}]);
