var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');

router.route('/')
	.get(function(req, res) {
		res.send('Hello James');
	});

router.route('/:id')
	.get(function(req, res){
		if (req.cookies.login) {
			db.getConnection(function(err, connection) {
				var query = connection.query('Select quiz from quizzes where id=?', req.params.id, function(err, message){
					connection.release();
					if(!err && message.length) {
						res.send(message[0].quiz);
					}
					else {
						res.send({error: 'Error lookup up quiz by id in database'});
					}
				})
			});
		}
	})
	.post(function(req, res){
		var id = (req.params.id == "dummy_id") ? 1 : req.params.id;
		db.getConnection(function(err, connection) {
			console.log('Select answers from quizzes where id=' + id);
			var query = connection.query('Select answers from quizzes where id=' + id, function(err, message){
				if(!err && message.length) {
					var answers = JSON.parse(message[0].answers);

					var selected = req.body;
					if(selected.length !== answers.length){
						res.send("error: answer length mismatch");
						return;
					}
					var score = 0;

					var pointValue = {
						mc: 2,
						tf: 2,
						ms: 5,
						ma: 5
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
					convert.cookieToId(req.cookies.login, function(userId){
						var query = 'Insert into results (quizid, userid, points, answers) values (' + id + ', '+ userId +', ' + score + ', \''+ JSON.stringify(selected) +'\')';
						console.log("ALERT: Submitting user's("+userId+") results ("+score+" points)");
						var pointsQuery = connection.query(query, function(insertError, message) {
							if(insertError) {
								console.log("ERROR: " + insertError);
								res.send(insertError);
							}

							else {
								res.send({score: score});
							}

						});
						connection.release();
					});
				}
				else {
					console.log("ERROR: Couldn't get correct answers for quiz " + id );
					res.send("error");
					connection.release();
				}
			})
		});
	});

router.route('/:id/results')
	.get(function(req, res){
		var id =  req.params.id;
		var userId = req.cookies.login;
		var quizResults = {};
		convert.cookieToId(req.cookies.login, function(userId){
			db.getConnection(function(err, connection){
					var getQuizQuery = 'Select answers from quizzes where id=' + id;;
					var queryAnswers = connection.query(getQuizQuery, function(err, message) {
						if (err) {console.log(err)}
						else {
							quizResults.answers = message[0].answers;
							getAnswersQuery = 'Select answers from results where quizid='  + id + " and userid=\'" + userId + "\'";
							var querySelected = connection.query(getAnswersQuery, function(err, message) {
								if (err) {console.log(err)}
								else {
									quizResults.selected = message[0].answers;
									res.send(JSON.stringify(quizResults));
								}
								connection.release();
							});
						}

					});
				});

			});
		});
		

module.exports = router;