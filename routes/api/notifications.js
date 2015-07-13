var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');

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