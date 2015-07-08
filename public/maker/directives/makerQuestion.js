app.directive("makerQuestion", function(){
	return {
		restrict: 'E',
		scope: {
			points: '='
		},
		templateUrl: '/maker/directives/templates/makerQuestion.html',
		link: function(scope, elem, attrs){
			scope.points = 1;
		}
	};
});