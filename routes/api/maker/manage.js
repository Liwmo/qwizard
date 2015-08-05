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
	var query = 'SELECT COUNT(*) AS num FROM users';
	db.query(query, function(err, message) {
		console.log(message);
		res.send(message);
	});
});

module.exports = router;

