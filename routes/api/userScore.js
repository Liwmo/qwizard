var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');

router.route('/:id')
	.get(function(req, res){
		var id = req.params.id;
		convert.cookieToId(req.cookies.login, function(userId){
			db.getConnection(function(err, connection){
					var getPointsQuery = 'Select points from results where quizid=' + id + ' and userid=' + userId;
					console.log(getPointsQuery);
					var queryPoints = connection.query(getPointsQuery, function(err, message) {
						connection.release();
						if(!err && message.length) {
							res.send(message[0]);
						}
						else {
							console.log('Error with Query');
							res.send("error");
						}

					});
				});

			});
		//res.sendFile(path.join(__dirname, "../../mockData/mockData.json"));
	});

module.exports = router;