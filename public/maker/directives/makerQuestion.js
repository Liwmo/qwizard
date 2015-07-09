app.directive("makerQuestion", function(){
	return {
		restrict: 'E',
		scope: {
			points: '=',
			questionName: '=',
			questionType: '=',
			possibleAnswers: '=',
			correctAnswer: '='
		},
		templateUrl: '/maker/directives/templates/makerQuestion.html',
		link: function(scope, elem, attrs){
			scope.points = 1;
		}
	};
});