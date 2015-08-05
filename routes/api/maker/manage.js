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

router.get('/totalEmployees', function(req, res) {
	var query = 'SELECT COUNT(*) AS totalEmployees FROM users';
	db.query(query, function(err, message) {
		res.send(message);
	});
});

router.get('/quizResultDetail/:id', function(req, res) {
	var query =  'SELECT q.publish, q.results, q.title, q.pointvalues, avg(r.points) AS avgPoints, sum(r.submitted) AS employees ';
		query += 'FROM quizzes AS q, results AS r ';
		query += 'WHERE r.submitted=1 and r.quizid=q.id and q.id=? ';
		query += 'GROUP BY q.id ' ;
		query += 'ORDER BY q.results DESC';

	db.query(query, req.params.id, function(err, message) {
		if(err) {
			res.send({error: 'quizResultDetail query failed'});
		} else {
			res.send(message);
		}
	});
});

module.exports = router;

