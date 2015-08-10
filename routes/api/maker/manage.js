var express = require('express');
var router = express.Router();
var db = require('../../../database/db.js');

router.get('/live', function(req, res) {
	var query =  'SELECT publish, results, title, id, ifnull(sum(submitted),0) AS employees ';
		query += 'FROM quizzes '
		query += 'LEFT JOIN results ON quizzes.id=results.quizid ';
		query += 'WHERE publish <= ? AND results > ? GROUP BY id ' ;
		query += 'ORDER BY results ASC';

	var today = (new Date()).toISOString().substr(0,10);

	db.query(query, [today, today], function(err, message) {
		if(err) {
			res.send({error: 'Live quiz query failed'});
		} else {
			res.send(message);
		}
	});

});

router.get('/finished', function(req, res) {
	var query =  'SELECT publish, results, title, id, ifnull(sum(submitted),0) AS employees ';
		query += 'FROM quizzes '
		query += 'LEFT JOIN results ON quizzes.id=results.quizid ';
		query += 'WHERE results <= ? GROUP BY id ' ;
		query += 'ORDER BY results ASC';
	var today = (new Date()).toISOString().substr(0,10);

	db.query(query, [today], function(err, message) {
		if(err) {
			res.send({error: 'Finished quiz query failed'});
		} else {
			res.send(message);
		}
	});

});


router.get('/scheduled', function(req, res) {
	var query =  'SELECT q.publish, q.results, q.title, q.id, q.pointvalues, q.questions ';
		query += 'FROM quizzes AS q ';
		query += 'WHERE q.publish > ? ';
		query += 'GROUP BY q.id ' ;
		query += 'ORDER BY q.publish ASC';

	var today = (new Date()).toISOString().substr(0,10);

	db.query(query, [today], function(err, message) {
		if(err) {
			res.send({error: 'Scheduled quiz query failed'});
		} else {
			res.send(message);
		}
	});

});

router.get('/totalEmployees', function(req, res) {
	var query = 'SELECT COUNT(*) AS totalEmployees FROM users';
	db.query(query, function(err, message) {
		res.send(message);
	});
});

router.get('/quizResultDetail/:id', function(req, res) {
	var query =  'SELECT publish as openDate, results as closeDate, title, pointvalues, ';
		query += 'questions, quizzes.answers, (ifnull(ifnull(sum(points),0)/ifnull(sum(submitted),0),0)) AS avgPoints, ifnull(sum(submitted),0) AS employees ';
		query += 'FROM quizzes ';
		query += 'LEFT JOIN results ON quizzes.id=results.quizid ';
		query += 'WHERE id=? ';
		query += 'GROUP BY id';

	db.query(query, req.params.id, function(err, message) {
		if(err || !message.length) {
			res.send({error: 'quizResultDetail query failed'});
			} 
		else {
			res.send(message[0]);
		}
	});
});

router.get('/allAnswersForAQuiz/:id', function(req, res) {
	var query =  'SELECT answers from results where submitted=1 and quizid=?';
	db.query(query, req.params.id, function(err, message) {
		if(err || !message.length) {
			res.send({error: 'quizResultDetail query failed'});
		}
		else {
			res.send(message);
		}
	});
});

router.get('/drafts', function(req, res){
	var query = 'SELECT id, title, questions, publish from quizzes ' +
				'WHERE publish IS NULL AND results IS NULL';
	db.query(query, function(err, message) {
		if(err) {
			console.log("ERROR: Invalid query for quiz drafts", err);
			res.send({error: 'Failed with draft query'});
		} else {
			res.send(message);
		}
	});
});

module.exports = router;

