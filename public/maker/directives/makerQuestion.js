app.directive("makerQuestion", ["employeeFactory", function(employeeFactory){
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
			maxedOut: '=',
			matchingClues: '=',
			matchingAnswers: '='
		},
		templateUrl: '/maker/directives/templates/makerQuestion.html',
		link: function(scope, elem, attrs) {
			scope.disabled = attrs.liveEdit;
			var savedQuestionText = "", saved = false;

			scope.tf = function(value){
				scope.correctAnswer[0] = value;
			};

			scope.setQuestionDefaults = function() {
				//scope.questionName = "";
				scope.possibleAnswers = ["", "", ""];
				scope.matchingClues = ["", "", "", ""];
				scope.matchingAnswers = ["", "", "", ""];

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
					scope.points = 2;
					if(scope.possibleAnswers.length < 4) {
						scope.possibleAnswers.push("");
					}
					while (scope.possibleAnswers.length > 4)
						scope.possibleAnswers.pop();
					scope.buildAnswers();
				}
				else if(scope.questionType == "pm"){
					saved = true;
					savedQuestionText = scope.questionText;
					scope.questionText = "PM";
					scope.questionName = "Photo Match";
					scope.points = 2;
					if(scope.possibleAnswers.length < 4) {
						scope.possibleAnswers.push("");
					}

					while (scope.possibleAnswers.length > 4)
						scope.possibleAnswers.pop();

					employeeFactory.getRandomEmployees(function(data){
						scope.matchingClues = data.matchingClues;
						scope.matchingAnswers = data.matchingAnswers;
						scope.buildAnswers();
					});
				}

				if(scope.questionType != "pm" && saved){
					scope.questionText = savedQuestionText;
					saved = false;
				}

				scope.correctAnswer = [];
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
			};

			scope.matchingClues = ["", "", "", ""];
			scope.matchingAnswers = ["", "", "", ""];

			// Unpacking matching answers if loading quiz from server
			if((scope.questionType === 'ma' || scope.questionType === 'pm') && scope.correctAnswer.length) {
				scope.correctAnswer.forEach(function(answer, index) {
					var split = answer.split(':');
					scope.matchingClues[index] = split[0];
					scope.matchingAnswers[index] = split[1];
				});
			}

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
			};

			scope.removeAnswer = function(index) {
				var correctIndex = scope.correctAnswer.indexOf(index);//index in array of correct answers
				if(correctIndex !== -1){
					scope.correctAnswer.splice(correctIndex, 1);
				}
				scope.possibleAnswers.splice(index, 1);
				scope.maxedOut = scope.possibleAnswers.length >= scope.max;
			};

			scope.remove = function() {
				scope.$emit('removeQuestion', scope.index);
			};

			function shuffle(array) {
				tmpArray = [];
				for (var i = 0; i < array.length; i++)
					tmpArray.push(array[i]);

			  var m = tmpArray.length, t, i;
			  while (m > 0) {
				i = Math.floor(Math.random() * m--);
				t = tmpArray[m];
				tmpArray[m] = tmpArray[i];
				tmpArray[i] = t;
			  }
			  return tmpArray;
			};

			scope.replace = function(index){
				if(!scope.disabled) {
					employeeFactory.getOneEmployee(scope.matchingClues, function(employee){
						scope.matchingClues[index] = employee.matchingClues[0];
						scope.matchingAnswers[index] = employee.matchingAnswers[0];
						scope.buildAnswers();
					});
				}
			};

			scope.getTypeTemplate = function() {
				type = scope.questionType || "tf";
				var qTypeUrl = '/maker/directives/templates/' + type + ".html";
				return qTypeUrl;
			}
		}
	};
}]);