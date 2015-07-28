app.directive("question", ['ngDraggable', function(){
	return {
		restrict: 'E',
		scope: {
			text: '=',
			answers: '=',
			selected: '=',
			type: '=',
			name: '=',
			correct: '='
		},
		templateUrl: '/taker/directives/templates/question.html',
		link: function(scope, elem, attrs){
			scope.tf = function(answer){
				scope.selected[0] = answer;
			};

			scope.mc = scope.tf;

			scope.ms = function(answer){
				var index = scope.selected.indexOf(answer);
				if(index !== -1){
					scope.selected.splice(index, 1);
				}else{
					scope.selected.push(answer);
				}
				scope.selected.sort(function(a, b){return a - b});
			};

			scope.getType = function(){
				return '/taker/directives/templates/' + scope.type + '.html';
			}
			scope.onDropComplete = function(dropIndex, data, e) {
				var dropElement = document.querySelector("#drop" + dropIndex);
				var dragElement = e.element[0];
				if (dropElement.children.length == 0) {
					dropElement.appendChild(e.element[0]);
					dragElement.classList.add("dropped");
					dragElement.classList.remove("shadow");
					scope.selected[dropIndex] = scope.clues[dropIndex]+':'+scope.options[data.index];
				}

			}

			scope.clues = [];
			scope.options = [];
			if (scope.type == 'ma') {
				for (var i = 0; i < scope.answers.length; i++) {
					var pair = scope.answers[i].split(':');
					scope.clues[i] = pair[0];
					scope.options[i] = pair[1];
				}
			}
		}
	};
}]);