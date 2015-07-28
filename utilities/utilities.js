module.exports.calculateQuizScore = function(selectedAnswers, correctAnswers, pointValues) {
	var points = 0;

	for(var i = 0; i < correctAnswers.length; i++){

		if(correctAnswers[i].length != selectedAnswers[i].answer.length) {
			continue;
		}

		var matches = true;

		// If the answer is a string then it must be a matching question
		if(typeof selectedAnswers[i].answer[0] === 'string') {
			for(var j = 0; j < correctAnswers[i].length; j++) {
				if(selectedAnswers[i].answer[j] === correctAnswers[i][j]) {
					points += pointValues[i];
				}
			}
		} else {
			for(var j = 0; j < correctAnswers[i].length && matches; j++){
				if(selectedAnswers[i].answer[j] != correctAnswers[i][j]){
					matches = false;
				}
			}

			if(matches) {
				points += pointValues[i];	
			}
		}
	}

	return points;
}