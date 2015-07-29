app.factory('employeeFactory', ["$http", function($http){
	var self = this;

	self.getRandomEmployees = function(callback){
		$http.get('/api/maker/randomEmployees').success(function(data){
			callback(data);
		});
	};

	return self;
}]);