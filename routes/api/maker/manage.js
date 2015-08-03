var express = require('express');
var router = express.Router();
var db = require('../../../database/db.js');

router.get('/finished', function(req, res) {
	var query =  'SELECT q.publish, q.results, q.title, q.id ';
		query += 'FROM quizzes q ';
		query += 'WHERE q.results<=? ';
		query += 'ORDER BY q.results DESC';

	var today = (new Date()).toISOString().substr(0,10);

	db.query(query, [today], function(err, message) {
		if(err) {
			res.send({error: 'Finished quiz query failed'});
		}else{
			res.send(message);
		}
	});
});

module.exports = router;