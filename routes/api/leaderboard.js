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

router.route('/:userid')
	.get(function(req, res){
		res.sendFile(path.join(__dirname, "../../mockData/mockScores.json"));
	});

module.exports = router;