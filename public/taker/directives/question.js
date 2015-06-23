app.directive("question", function(){
	return {
		restrict: 'E',
		scope: {
			text: '=',
			answers: '=',
			selected: '=',
			type: '=',
			name: '='
		},
		templateUrl: '/taker/directives/templates/question.html',
		link: function(scope, elem, attrs){
			scope.tf = function(c){
				scope.selected = c;
			};
			scope.getType = function(){
				return '/taker/directives/templates/' + scope.type + '.html';
			}
		}
	};
});