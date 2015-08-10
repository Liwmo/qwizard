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
				'mc': 'Multiple Choice'
			};
			if(scope.question.type == 'tf'){
				scope.question.answers = ['True', 'False'];
			}
		}
	};
}]);