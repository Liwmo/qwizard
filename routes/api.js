//api.js

var express = require('express');
var router = express.Router();
var quiz = require('./api/quiz');
var leaderboard = require('./api/leaderboard');
var userScore = require('./api/userScore');
var db = require('../database/db.js');

router.all('/*', function(req, res, next){
	console.log('route caught, verifying');
	db.getConnection(function(err, connection){
		if(!err){
			var query = connection.query("select * from tokens where cookie=?", req.cookies.login, function(err, message){
				if(!err && message.length){
					next();
				}else{
					res.send({error: 'improper credentials'});
				}
				connection.release();
			});
		}else{
			res.send({error: 'no db connection'});
		}
	});
});

router.use('/quiz', quiz);
router.use('/leaderboard', leaderboard);
router.use('/userscore', userScore);


module.exports = router;