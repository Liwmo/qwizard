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
				var dragElement = e.element[0];
				var optionIndexOfDraggedElement = dragElement.id[dragElement.id.length-1];
				var clueIndexOfDraggedFromTarget = dragElement.parentElement.id[dragElement.parentElement.id.length-1];

				var dropToTarget = elem[0].querySelector("#drop" + dropIndex);
				var dropFromTarget = elem[0].querySelector("#drop" + clueIndexOfDraggedFromTarget);

				var swapElement = dropToTarget.children[0];
				var optionIndexOfSwapElement = scope.dropped[dropIndex];
				
				if (dropToTarget.children.length == 0 && !clueIndexOfDraggedFromTarget) {
					dropToTarget.appendChild(dragElement);
					dragElement.classList.add("dropped");
					dragElement.classList.remove("shadow");
					scope.dropped[dropIndex] = optionIndexOfDraggedElement;
				}
				else if (dropToTarget.children.length == 0 && dropFromTarget.children.length > 0) {
					dropToTarget.appendChild(dragElement);
					dragElement.classList.add("dropped");
					scope.dropped[dropIndex] = optionIndexOfDraggedElement;
					scope.dropped[clueIndexOfDraggedFromTarget] = -1;
				}
				else if (dropToTarget.children.length > 0) {
					dropToTarget.appendChild(dragElement);
					dropFromTarget.appendChild(swapElement);
					scope.dropped[dropIndex] = optionIndexOfDraggedElement;
					scope.dropped[clueIndexOfDraggedFromTarget] = optionIndexOfSwapElement; 
				}

				buildSelected();
			}

			var buildSelected = function() {
				for (var i = 0; i < scope.clues.length; i++) {
					if (scope.dropped[i] < 0) {
						scope.selected[i] = scope.clues[i]+':'+"";
					}
					else {
						scope.selected[i] = scope.clues[i]+':'+scope.options[scope.dropped[i]];	
					}
				}
				console.log(scope.selected);
			}

			scope.clues = [];
			scope.options = [];
			scope.dropped = [-1, -1, -1,-1];
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