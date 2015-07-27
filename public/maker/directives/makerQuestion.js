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

			scope.setQuestionDefaults = function() {
				if(scope.questionType == 'tf') {
					scope.points = 2;
				}
				else if(scope.questionType == 'mc') {
					scope.points = 2;
				}
				else if(scope.questionType == 'ms') {
					scope.points = 5;
				}
				else if(scope.questionType == "ma") {
					scope.points = 5;
					scope.possibleAnswers = ["", "", "", ""]
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

			scope.matchingClues = ["", "", "", ""];
			scope.matchingAnswers = ["", "", "", ""];

			scope.buildAnswers = function() {
				scope.correctAnswer = [
					scope.matchingClues[0] + ":" + scope.matchingAnswers[0],
					scope.matchingClues[1] + ":" + scope.matchingAnswers[1],
					scope.matchingClues[2] + ":" + scope.matchingAnswers[2],
					scope.matchingClues[3] + ":" + scope.matchingAnswers[3]
				];

				var randoms = shuffle(scope.matchingAnswers);

				scope.possibleAnswers = [
					scope.matchingClues[0] + ":" + randoms[0],
					scope.matchingClues[1] + ":" + randoms[1],
					scope.matchingClues[2] + ":" + randoms[2],
					scope.matchingClues[3] + ":" + randoms[3]
				];

				console.log("Correct: " + JSON.stringify(scope.correctAnswer));
				console.log("Possible: " + JSON.stringify(scope.possibleAnswers));
			}

			function shuffle(array)
			{
				tmpArray = [];
				for (var i = 0; i < array.length; i++)
					tmpArray.push(array[i]);

			  var m = tmpArray.length, t, i;
			  while (m > 0) 
			  {
				i = Math.floor(Math.random() * m--);
				t = tmpArray[m];
				tmpArray[m] = tmpArray[i];
				tmpArray[i] = t;
			  }
			  return tmpArray;
			}
		}
	};
});