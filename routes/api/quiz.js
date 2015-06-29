var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');

router.route('/')
	.get(function(req, res) {
		res.send('Hello James');
	});

router.route('/:id')
	.get(function(req, res){
		var id = (req.params.id == "dummy_id") ? 1 : req.params.id;
		db.getConnection(function(err, connection) {
			console.log('Select quiz from quizzes where id=' + id);
			var query = connection.query('Select quiz from quizzes where id=' + id, function(err, message){
				connection.release();
				if(!err && message.length) {
					res.send(message[0].quiz);
				}
				else {
					console.log('Error with Query');
					res.send("error");
				}
			})
		});
		//res.sendFile(path.join(__dirname, "../../mockData/mockData.json"));
	})
	.post(function(req, res){
		var id = (req.params.id == "dummy_id") ? 1 : req.params.id;
		db.getConnection(function(err, connection) {
			console.log('Select answers from quizzes where id=' + id);
			var query = connection.query('Select answers from quizzes where id=' + id, function(err, message){
				connection.release();
				if(!err && message.length) {
					var answers = JSON.parse(message[0].answers);
					if(id == 1){
						answers = answers.slice(3, 10);
					}

					var selected = req.body;
					if(selected.length !== answers.length){
						res.send("error: answer length mismatch");
						return;
					}
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
				}
				else {
					console.log('Error with Query');
					res.send("error");
				}
			})
		});
	});

module.exports = router;