var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');
var utils = require('../../utilities/utilities')

router.route('/:id')
	.get(function(req, res){
		var today = (new Date()).toISOString().substr(0,10);
		var id = parseInt(req.params.id) || -1;
		db.query('Select title, questions from quizzes where id=? and publish<=?', [id, today], function(err, message){
			if(!err && message.length) {
				var quiz = {
					title: message[0].title,
					questions: JSON.parse(message[0].questions)
				};
				res.send(quiz);
			}
			else {
				res.send({error: 'Error lookup up quiz by id in database'});
			}
		});
	})
	.post(function(req, res){
		var quizId = parseInt(req.params.id) || -1;
		db.query('Select answers, pointvalues from quizzes where id=?', quizId, function(err, message){
			if(!err && message.length) {
				var answers = JSON.parse(message[0].answers);
				var pointValues = JSON.parse(message[0].pointvalues);

				var selected = req.body;
				if(selected.length !== answers.length){
					res.send("error: answer length mismatch");
					return;
				}

				// var points = 0;
				// for(var i = 0; i < answers.length; i++){
				// 	var matches = true;
				// 	for(var j = 0; j < answers[i].length; j++){
				// 		if(selected[i].answer[j] != answers[i][j]){
				// 			matches = false;
				// 		}
				// 	}
				// 	if(matches){
				// 		points += pointValues[i];
				// 	}
				// }

				var points = utils.calculateQuizScore(selected, answers, pointValues);

				convert.cookieToId(req.cookies.login, function(userId){
					db.query('Insert into results SET ?', {
						quizid: quizId,
						userid: userId,
						points: points,
						answers: JSON.stringify(selected)
					},function(insertError, message) {
						if(insertError) {
							console.log("ERROR: " + insertError);
							res.send(insertError);
						}else{
							res.send("success");
						}
					});
				});
			}else{
				console.log("ERROR: Couldn't get correct answers for quiz " + quizId );
				res.send("error");
			}
		})
	})
	.delete(function(req, res) {
		console.log("Entering the delete endpoint");
		var quizId = parseInt(req.params.id) || -1;
		convert.cookieToId(req.cookies.login, function(userId) {
			db.query('select author from quizzes where id=' + quizId + " and author=" + userId, function(err, message) {
				if (err) {console.log(err); res.send({error: err});}
				if (message.length > 0) {
					console.log("ALERT: Removing Quiz and results - " + quizId);
					db.query('delete from results where quizid=' + quizId, function(err, message){
						db.query('delete from quizzes where id=' + quizId, function(err, message) {
							if (err) {console.log(err); res.send({error: err});}
							res.send({success: "Quiz and results have been deleted"});
						});
					});
				}
			});
		});
	});

router.route('/:id/results')
	.get(function(req, res){
		var id =  req.params.id;
		convert.cookieToId(req.cookies.login, function(userId){
			var getQuizQuery = 	'select q.answers, q.pointvalues, r.answers as selected ' +
								'from quizzes as q, results as r ' +
								'where q.id=? and r.quizid=? and r.userid=?';
								
			var getQuizNoUser = 'select answers, pointvalues from quizzes where id=?';
			db.query(getQuizQuery, [id, id, userId], function(err, message) {
				if (err){
					res.send({error: 'no results for user-quiz pair'});
				}
				else if (message.length <= 0) {
					db.query(getQuizNoUser, [id], function(err, message) {
						if (err || message.length <= 0) {
							console.log("ERROR: Request for quiz, not found");
							res.send({error: 'could not find quiz'});
						}
						else {
							console.log("ALERT: User didn't take quiz, returning answers");
							res.send(message[0]);
						}
					});
				}
				else{
					res.send(message[0]);
				}
			});
		});
	});
		

module.exports = router;