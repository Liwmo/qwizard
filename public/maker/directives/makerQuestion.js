app.directive("makerQuestion", function(){
	return {
		restrict: 'E',
		scope: {
			points: '=',
			questionName: '=',
			questionType: '=',
			questionText: '=',
			possibleAnswers: '=',
			correctAnswer: '='
		},
		templateUrl: '/maker/directives/templates/makerQuestion.html',
		link: function(scope, elem, attrs){
			scope.points = 1;

			//SUPER DUPER IMPORTANT TODO: scope.possibleAnswers should be created to look EXACTLY
			//  as our quiz object expects it.  For example, a multiple choice would look like:
			//  scope.possibleAnswers =  ["2 years","3 years","4 years","5 years"]
		}
	};
});