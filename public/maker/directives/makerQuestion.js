app.directive("makerQuestion", function(){
	return {
		restrict: 'E',
		scope: {
			points: '=',
			questionName: '=',
			questionType: '=',
			questionText: '=',
			possibleAnswers: '=',
			correctAnswer: '=',
			index: '=',
			max: '=',
			maxedOut: '='
		},
		templateUrl: '/maker/directives/templates/makerQuestion.html',
		link: function(scope, elem, attrs){
			scope.points = 1;

			scope.tf = function(value){
				scope.correctAnswer[0] = value;
			};

			scope.setDefaultPoints = function() {
				if(scope.questionType == 'tf') {
					scope.points = 2;
				}
				else if(scope.questionType == 'mc') {
					scope.points = 2;
				}
				else if(scope.questionType == 'ms') {
					scope.points = 5;
				}
			};

			scope.mc = scope.tf;

			scope.ms = function(value) {
				var index = scope.correctAnswer.indexOf(value);
				if(index !== -1){
					scope.correctAnswer.splice(index, 1);
				}else{
					scope.correctAnswer.push(value);
				}

				scope.correctAnswer.sort(function(a,b){return a-b});
			};

			scope.addOption = function() {
				if (scope.possibleAnswers.length < scope.max) {
					scope.possibleAnswers.push("");
				}
				scope.maxedOut = scope.possibleAnswers.length >= scope.max;
			}

			scope.removeAnswer = function(index) {
				scope.possibleAnswers.splice(index, 1);
			}

			scope.remove = function() {
				scope.$emit('removeQuestion', scope.index);
			}
		}
	};
});