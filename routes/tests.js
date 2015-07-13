var express = require('express');
var router = express.Router();
var db = require('../database/db.js');
var auth = require('./authentication');
var convert = require('./userConversion');

router.all('/*', auth.authenticateCookie);

router.get('/removeNotification', function(req, res){
	convert.cookieToId(req.cookies.login, function(userId) {
		var query = 	'DELETE FROM notifications WHERE userid=? and quizid=? and typeid=?';
		var query = db.query(query, [userId, 1, 1], function(err, results) {
			if(err) {
				res.send({error: err});
			}else{
				res.send(200);
			}
			console.log(query.sql);
		});
	});
});

router.get('/addNotification', function(req, res){
	convert.cookieToId(req.cookies.login, function(userId) {
		var query = 	'INSERT INTO notifications SET ?';
		var query = db.query(query, {userId: userId, quizId: 1, typeId: 1}, function(err, results) {
			if(err) {
				res.send({error: err});
			}else{
				res.send(200);
			}
			console.log(query.sql);
		});
	});
});

module.exports = router;