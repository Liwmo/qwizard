app.factory('employeeFactory', ["$http", function($http){
	var self = this;

	self.getRandomEmployees = function(callback){
		$http.get('/api/maker/randomEmployees').success(function(data){
			callback(data);
		});
	};

	self.getOneEmployee = function(current, callback){
		console.log(current);
		$http.get('/api/maker/randomEmployees/one', {params: {current: current}}).success(function(data){
			callback(data);
		});
	};

	return self;
}]);