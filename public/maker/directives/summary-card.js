app.directive("summaryCard", [function() {
	return {
		restrict: 'E',
		scope: {
			question: '='
		},
		templateUrl: '/maker/directives/templates/summary-card.html',
		link: function(scope, elem, attrs) {
			scope.type = {
				'tf': 'True/False',
				'mc': 'Multiple Choice',
				'ms': 'Multiple Select',
				'ma': 'Matching'
			};
			if(scope.question.type == 'tf'){
				scope.question.answers = ['True', 'False'];
			}
			if(scope.question.type == 'ma') {
				scope.isMatching = true;
				scope.question.answers = scope.question.correct;
			}
		}
	};
}]);