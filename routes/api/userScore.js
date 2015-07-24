var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');


router.route('/')
	.get(function(req, res) {
		convert.cookieToId(req.cookies.login, function(userId) {

			var query =  'SELECT q.publish, q.results, q.title, q.id, r.viewed, r.points ';
				query += 'FROM quizzes q, results r ';
				query += 'WHERE q.id=r.quizid and r.userid=? and q.results<=? ';
				query += 'ORDER BY q.results DESC';

			var today = (new Date()).toISOString().substr(0,10);

			db.query(query, [userId, today], function(err, message) {
				if(err) {
					res.send({error: 'Users results query failed'});
				}else{
					res.send(message);
				}
			});
		});
	});

router.route('/:id')
	.get(function(req, res){
		convert.cookieToId(req.cookies.login, function(userId){
			db.getConnection(function(err, connection){
				var id = parseInt(req.params.id) || -1;
				var query = connection.query('Select points from results where quizid=? and userid=?', [id, userId], function(err, message){
					connection.release();
					if(!err && message.length) {
						res.send(message[0]);
					}
					else {
						console.log("ERROR: There was an error fetching user " + userId + "'s results for quiz " + id + ".");
						res.send("error");
					}
				})
			});
		});
		//res.sendFile(path.join(__dirname, "../../mockData/mockData.json"));
	});

module.exports = router;