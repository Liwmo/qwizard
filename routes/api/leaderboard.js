var express = require('express');
var path = require('path');
var router = express.Router();

router.route('/')
	.get(function(req, res) {
		console.log('getting leaderboard');
		res.sendFile(path.join(__dirname, "../../mockData/mockScores.json"));
	});

router.route('/:userid')
	.get(function(req, res){
		res.sendFile(path.join(__dirname, "../../mockData/mockScores.json"));
	});

module.exports = router;