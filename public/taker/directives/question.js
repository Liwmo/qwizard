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

			scope.clues = [];
			scope.options = [];
			if (scope.type == 'ma') {
				for (var i = 0; i < scope.answers.length; i++) {
					var pair = scope.answers[i].split(':');
					scope.clues[i] = pair[0];
					scope.options[i] = pair[1];
				}
			}

			// scope.onDragComplete = function(data, e) {
			// 	console.log(data);
			// 	console.log("Successful Drag: ", e);
			// }

			scope.onDropComplete = function(dropIndex, data, e) {
				console.log("Successful Drop:", data.index);
				console.log(e);
				e.element[0].classList.add("dropped");
				document.querySelector("#drop" + dropIndex).appendChild(e.element[0]);
			}
		}
	};
}]);