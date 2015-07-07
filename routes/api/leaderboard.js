var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');

router.route('/')
	.get(function(req, res) {
		var query =		'select name, userid, sum(points) as score ';
			query +=	'from users, results ';
			query += 	'where userid=id ';
			query += 	'group by userid';
		db.query(query, function(err, message) {
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

		if(date.toString == "Invalid Date"){
			res.send({error: 'invalid date'});
			return;
		}

		var query =		'select name, userid, sum(points) as score ';
			query +=	'from users as u, results as r, quizzes as q ';
			query += 	'where r.userid=u.id and r.quizid=q.id and q.results>=? ';
			query += 	'group by userid';
		console.log(query);
		db.query(query, date, function(err, message) {
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