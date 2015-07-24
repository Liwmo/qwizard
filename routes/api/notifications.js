var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');

router.route('/')
	.get(function(req, res) {
		convert.cookieToId(req.cookies.login, function(userId) {
			console.log("Retrieving notifications from database");
			var query = 	'SELECT q.id, q.title, n.typeID ';
				query += 	'FROM notifications n, quizzes q ';
				query += 	'WHERE n.userID=? and q.id=n.quizId';

			var query = db.query(query, userId, function(err, results) {
				if(err) {
					res.send({error: err});
				}else{
					res.send(results);
				}
			});
		});
	});

router.route('/remove/:id')
	.get(function(req, res) {
		convert.cookieToId(req.cookies.login, function(userId) {
			var quizId = req.params.id;

			var query = 	'DELETE FROM notifications ';
				query += 	'WHERE userID=? and quizId=?';

			var query = db.query(query, [userId, quizId], function(err, results) {
				if(err) {
					res.send({error: err});
				}else{
					res.send(results);
				}
			});
		});
	});

module.exports = router;