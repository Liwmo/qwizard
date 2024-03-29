var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');

router.route('/')
	.get(function(req, res) {
		var today = new Date().toISOString().substr(0,10);
		var query =		'select name, userid, ifnull(sum(points),0) as score ';
			query +=	'from users as u, results as r, quizzes as q ';
			query += 	'where r.userid=u.id and r.quizid=q.id and q.results<=? ';
			query += 	'group by userid';
		db.query(query, today, function(err, message) {
			if(err) {
				res.send({error: 'cannot access leaderboard data'});
			}else{
				res.send({users: message});
			}
		})

		//res.sendFile(path.join(__dirname, "../../mockData/mockScores.json"));
	});

router.route('/since/:date')
	.get(function(req, res){
		var date = new Date(req.params.date);
		var today = new Date().toISOString().substr(0,10);

		if(date.toString() == "Invalid Date"){
			res.send({error: 'invalid date'});
			return;
		}

		var query =		'select name, userid, ifnull(sum(points),0) as score ';
			query +=	'from users as u, results as r, quizzes as q ';
			query += 	'where r.userid=u.id and r.quizid=q.id and q.results>=? and q.results<=? ';
			query += 	'group by userid';
		db.query(query, [date.toISOString().substr(0,10), today], function(err, message) {
			if(err) {
				res.send({error: 'cannot access leaderboard data'});
			}else{
				res.send({users: message});
			}
		})
	});

router.route('/:userid')
	.get(function(req, res){
		res.sendFile(path.join(__dirname, "../../mockData/mockScores.json"));
	});

module.exports = router;