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
			scope.tf = function(answer){
				scope.selected = answer;
			};

			scope.mc = scope.tf;

			scope.ms = function(answer){
				if(!scope.selected){
					scope.selected = [answer];
				}else{
					var index = scope.selected.indexOf(answer);
					if(index !== -1){
						scope.selected.splice(index, 1);
					}else{
						scope.selected.push(answer);
					}
				}
			};

			scope.getType = function(){
				return '/taker/directives/templates/' + scope.type + '.html';
			}
		}
	};
});