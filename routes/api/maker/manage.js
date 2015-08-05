var express = require('express');
var router = express.Router();
var db = require('../../../database/db.js');

router.get('/finished', function(req, res) {
	var query =  'SELECT q.publish, q.results, q.title, q.id, sum(r.submitted) AS employees ';
		query += 'FROM quizzes AS q, results AS r ';
		query += 'WHERE q.results<=? AND r.quizid=q.id ';
		query += 'GROUP BY q.id ' ;
		query += 'ORDER BY q.results DESC';

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
	var query =  'SELECT q.publish as openDate, q.results as closeDate, q.title, q.pointvalues, q.questions, q.answers, avg(r.points) AS avgPoints, sum(r.submitted) AS employees ';
		query += 'FROM quizzes AS q, results AS r ';
		query += 'WHERE r.submitted=1 and r.quizid=q.id and q.id=? ';
		query += 'GROUP BY q.id ' ;
		query += 'ORDER BY q.results DESC';

	db.query(query, req.params.id, function(err, message) {
		if(err) {
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

