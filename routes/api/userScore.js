var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');

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
						console.log('Error with Query');
						res.send("error");
					}
				})
			});
		});
		//res.sendFile(path.join(__dirname, "../../mockData/mockData.json"));
	});

module.exports = router;