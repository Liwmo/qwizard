module.exports.calculateQuizScore = function(selectedAnswers, correctAnswers, pointValues) {
	var points = 0;

	for(var i = 0; i < correctAnswers.length; i++){

			if(correctAnswers[i].length != selectedAnswers[i].answer.length) {
				continue;
		}

		var matches = true;
		for(var j = 0; j < correctAnswers[i].length; j++){
			if(selectedAnswers[i].answer[j] != correctAnswers[i][j]){
				matches = false;
			}
		}
		
		if(matches){
			points += pointValues[i];
		}
	}

	return points;
}