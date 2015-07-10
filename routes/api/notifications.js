var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');

/* NOT SURE IF THIS WAS ACCIDENTALLY DELETED. IS THIS CODE NEEDED???
router.route('/results')
	.get(function(req, res) {

		convert.cookieToId(req.cookies.login, function(userId) {
			var today = (new Date()).toISOString().substr(0,10);
			console.log('today: %s', today);
			var query = 	'SELECT q.id, q.title ';
				query += 	'FROM quizzes q, results r ';
				query += 	'WHERE q.id=r.quizid and r.userid=? and q.results<=? and r.viewed=0';

			var query = db.query(query, [userId, today], function(err, results) {
				if(err) {
					res.send({error: err});
				}else{
					res.send(results);
				}
				console.log(query.sql);
			});
		});
	});
*/

router.route('/')
	.get(function(req, res) {
		convert.cookieToId(req.cookies.login, function(userId) {
			var query = 	'SELECT q.id, q.title, n.typeId ';
				query += 	'FROM notifications n, quizzes q ';
				query += 	'WHERE userId=? and q.id=n.quizId';

			var query = db.query(query, userId, function(err, results) {
				if(err) {
					res.send({error: err});
				}else{
					res.send(results);
				}
				console.log(query.sql);
			});
		});
	});

router.route('/remove/:id')
	.get(function(req, res) {
		convert.cookieToId(req.cookies.login, function(userId) {
			var quizId = req.params.id;

			var query = 	'DELETE FROM notifications ';
				query += 	'WHERE userId=? and quizId=?';

			var query = db.query(query, [userId, quizId], function(err, results) {
				if(err) {
					res.send({error: err});
				}else{
					res.send(results);
				}
				console.log(query.sql);
			});
		});
	});

module.exports = router;