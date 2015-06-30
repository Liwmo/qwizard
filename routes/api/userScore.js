var express = require('express');
var path = require('path');
var router = express.Router();
var db = require('../../database/db');

router.route('/:id')
	.get(function(req, res){
		var id = (req.params.id == "dummy_id") ? 1 : req.params.id;
		db.getConnection(function(err, connection) {
			var userid = 9001;
			console.log('Select points from results where quizid=' + id + ' and userid=' + userid);
			var query = connection.query('Select points from results where quizid=' + id + ' and userid=' + userid, function(err, message){
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
		//res.sendFile(path.join(__dirname, "../../mockData/mockData.json"));
	});

module.exports = router;