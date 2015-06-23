app.directive("question", function(){
	return {
		restrict: 'E',
		scope: {
			text: '=',
			answers: '=',
			selected: '=',
			type: '=',
		},
		template: '<div ng-include="getType()"></div>',
		link: function(scope, elem, attrs){
			scope.tf = function(answer){
				scope.selected = answer;
			};

			scope.mc = scope.tf;

			scope.getType = function(){
				return '/taker/directives/templates/' + scope.type + '.html';
			}
		}
	};
});