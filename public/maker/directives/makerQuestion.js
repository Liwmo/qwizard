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
				else {
					scope.points = 5;
				}
			};

			scope.mc = scope.tf;

			// var textfield = document.querySelector(".question-text"); 
   // 			textfield.addEventListener("keypress", function(e) {
   //      		if(this.innerHTML.length >= this.getAttribute("max")){
   //         			e.preventDefault();
   //          		return false;
   //      		}
   //      		console.log('char: ', e.char);
   //      		console.log('key: ', e.key);
   //      		console.log('charCode: ', e.charCode);
   //      		console.log('keyCode: ', e.keyCode);

   //      		console.log('this.innerHTML: ', this.innerHTML);
   //      		// scope.questionText = this.innerHTML;
   //      		scope.questionText = String.fromCharCode(e.charCode);
   //      		console.log('questionText: ', scope.questionText);
   //  		}, false);
			//SUPER DUPER IMPORTANT TODO: scope.possibleAnswers should be created to look EXACTLY
			//  as our quiz object expects it.  For example, a multiple choice would look like:
			//  scope.possibleAnswers =  ["2 years","3 years","4 years","5 years"]
		}
	};
});