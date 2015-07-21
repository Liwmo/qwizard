var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');
var utils = require('../../utilities/utilities')

router.route('/')
	.get(function(req, res){
		var today = (new Date()).toISOString().substr(0,10);
		convert.cookieToId(req.cookies.login, function(userId){
			var query =  'SELECT q.id, q.title, q.results ';
				query += 'FROM quizzes q ';
				query += 'WHERE q.publish<=? AND q.results>? AND (q.id, ?) NOT IN ';
				query += '(SELECT quizid, userid FROM results)';

			db.query(query, [today, today, userId], function(err, message){
				res.send(message);
			});
		});
	});

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
	});

router.route('/:id/results')
	.get(function(req, res){
		var id =  req.params.id;
		convert.cookieToId(req.cookies.login, function(userId){
			var getQuizQuery = 	'select q.answers, q.pointvalues, r.answers as selected ';
				getQuizQuery += 'from quizzes as q, results as r ';
				getQuizQuery += 'where q.id=? and r.quizid=? and r.userid=?';
			db.query(getQuizQuery, [id, id, userId], function(err, message) {
				if (err || !message.length){
					res.send({error: 'no results for user-quiz pair'});
				}else{
					res.send(message[0]);
				}
			});
		});
	});
		

module.exports = router;