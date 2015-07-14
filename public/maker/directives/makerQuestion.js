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

			// var textfields = document.getElementsByClassName("large"); 
			// for(i=0; i<textfields.length; i++){
   // 				textfields[i].addEventListener("keypress", function(e) {
   //      			if(this.innerHTML.length >= this.getAttribute("max")){
   //         				e.preventDefault();
   //          			return false;
   //      			}
   //  			}, false);
			// }

			var textfields = document.getElementsByClassName("question-text"); 
			for(i=0; i<textfields.length; i++){
   				textfields[i].addEventListener("keypress", function(e) {
        			if(this.innerHTML.length >= this.getAttribute("max")){
           				e.preventDefault();
            			return false;
        			}
    			}, false);
			}

			//SUPER DUPER IMPORTANT TODO: scope.possibleAnswers should be created to look EXACTLY
			//  as our quiz object expects it.  For example, a multiple choice would look like:
			//  scope.possibleAnswers =  ["2 years","3 years","4 years","5 years"]
		}
	};
});