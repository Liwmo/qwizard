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
		db.query('Select title, questions, results from quizzes where id=? and publish<=?', [id, today], function(err, message){
			if(!err && message.length) {
				var quiz = {
					title: message[0].title,
					questions: JSON.parse(message[0].questions),
					closeDate: message[0].results 
				};
				res.send(quiz);
			}
			else {
				res.send({error: 'Error lookup up quiz by id in database'});
			}
		});
	})
	.post(function(req, res){
		var today = (new Date()).toISOString().substr(0,10);
		var quizId = parseInt(req.params.id) || -1;
		db.query('Select answers, pointvalues from quizzes where id=? and results>?', [quizId, today], function(err, message){
			if(!err && message.length) {
				var answers = JSON.parse(message[0].answers);
				var pointValues = JSON.parse(message[0].pointvalues);

				var selected = req.body;
				if(selected.length !== answers.length){
					console.log("ALERT: Attempt to submit invalid answers #" + quizId);
					res.send({error: "answer length mismatch"});
					return;
				}

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
				console.log("ERROR: Quiz doesn't exist or closed to submission #" + quizId );
				res.send({error: "Quiz does not exist or is closed to submission."});
			}
		})
	})
	.delete(function(req, res) {
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
				else {
					res.send({error: "You are not the author or invalid quizId"});
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
				}else if (message.length <= 0) {
					db.query(getQuizNoUser, [id], function(err, message) {
						if (err || message.length <= 0) { //Bad quiz or other error
							res.send({error: 'could not find quiz'});
						}
						else { //No user-selected answers, good quiz
							res.send(message[0]);
						}
					});
				}
				else {
					db.query("UPDATE results SET viewed=1 WHERE userid=? AND quizid=?", [userId, id], function(){
						res.send(message[0]);
					});
					
				}
			});
		});
	});
	
module.exports = router;