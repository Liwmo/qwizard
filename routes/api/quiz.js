var express = require('express');
var path = require('path');
var router = express.Router();

router.route('/')
	.get(function(req, res) {
		res.send('Hello James');
	});

router.route('/:id')
	.get(function(req, res){
		res.sendFile(path.join(__dirname, "../../mockData/mockData.json"));
	})
	.post(function(req, res){
		var answers = require(path.join(__dirname, "../../mockData/mockCorrectAnswers.json"));
		var selected = req.body;
		var score = 0;

		var pointValue = {
			mc: 2,
			tf: 2,
			ms: 5
		};

		for(var i = 0; i < answers.length; i++){
			var matches = true;
			for(var j = 0; j < answers[i].length; j++){
				if(selected[i].answer[j] != answers[i][j]){
					matches = false;
				}
			}
			if(matches){
				score += pointValue[selected[i].type];
			}
		}
		res.send({score: score});
	});

module.exports = router;