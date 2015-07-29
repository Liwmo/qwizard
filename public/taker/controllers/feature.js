app.controller('feature', ['$scope', function($scope) {
    $scope.request = function(){
    	var email = 'qwizard@asyncrhony.com';
    	var subject = 'Request a Feature';
    	window.open('mailto:' + email + '?subject=' + subject);
    };
}]);