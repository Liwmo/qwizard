var express = require('express');
var router = express.Router();
var db = require('../../../database/db.js');
var auth = require('../../authentication');
var convert = require('../../userConversion');
var immediate = require('./immediate.js');

router.post('/', function(req, res){
	var quiz = req.body;
	var query = 'insert into quizzes SET ?';
	convert.cookieToId(req.cookies.login, function(userId){
		db.query(query, {
			title: quiz.title || "",
			questions: JSON.stringify(quiz.questions || []),
			answers: JSON.stringify(quiz.answers || []),
			results: quiz.results || null,
			publish: quiz.publish || null,
			pointvalues: JSON.stringify(quiz.pointValues || []),
			author: userId
		}, function(err, message){
			if(err){
				res.send({error: "Unable to create quiz."});
			}else{
				//insertId is a property automatically passed, is the auto_increment value
				res.send({id: message.insertId});
			}
		});
	});
});

router.put('/:id', function(req, res){
	var today = (new Date()).toISOString().substr(0,10);
	var quiz = req.body;

	if (typeof quiz !== "object" || JSON.stringify(quiz) === "{}"){
		console.log("ERROR: UserId: " + userId + " attempted to save invalid quiz");
		res.send({error: "Data is invalid"});
		return;
	}

	var query = 'update quizzes SET ? where id=? and author=?';
	convert.cookieToId(req.cookies.login, function(userId){
		var update = {};
		if(quiz.title) {
			update.title = quiz.title;
		}
		if(quiz.questions) {
			update.questions = JSON.stringify(quiz.questions);
		}
		if(quiz.answers) {
			update.answers = JSON.stringify(quiz.answers);
		}
		if(quiz.results) {
			update.results = quiz.results;
		}
		if(quiz.publish) {
			update.publish = quiz.publish;
		}
		if(quiz.pointValues) {
			update.pointvalues = JSON.stringify(quiz.pointValues);
		}
			
		db.query(query, [update, req.params.id, userId], function(err, message){
			if(err){
				console.log('ERROR: '+ err)
				res.send(err);
			}else{
				console.log("NOTE: UserId " + userId + " saved quiz " + req.params.id + ". Rows affected after updating: ", message.affectedRows);
				if(message.affectedRows == 0) {
					res.send({error: "Quiz-Author pair is invalid."})
				}
				else {
					res.send({id: req.params.id});
					console.log("Comparing against date: " + today + "  " + quiz.publish);
					if(quiz.publish.substr(0,10) === today){
						console.log("ALERT: notifications to be generated today for quiz #" + req.params.id);
						immediate.generateNotifications(req.params.id);
					}
				}
			}
		});
	});
});

router.get('/:id', function(req, res) {
	var query = 'select * from quizzes where id=? and author=?';
	convert.cookieToId(req.cookies.login, function(userId){
		db.query(query, [req.params.id, userId], function(err, message){
			if(err){
				console.log('ERROR: '+ err)
				res.send({error: 'Quiz not found.'});
			}else{
				res.send(message[0] || {error: "Author-quiz pair is invalid."});
			}
		});
	});
});

module.exports = router;