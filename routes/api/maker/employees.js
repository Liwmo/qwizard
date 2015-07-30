var express = require('express');
var router = express.Router();
var db = require('../../../database/db.js');

router.get('/', function(req, res){
	db.query('SELECT id, name FROM users', function(err, message) {
		if(err || message.length < 4) {
			res.send({error: 'Unable to query database for four user ids'});
		} else {
			var data = {
				matchingClues: [],
				matchingAnswers: []
			};
			for(var i = 0; i < 4; i++){
				var rand = Math.floor(Math.random() * message.length);
				data.matchingClues.push(message[rand].id);

				var name = message[rand].name.split('.');
				name.forEach(function(e, i, a){
					a[i] = e[0].toUpperCase() + e.substr(1);
				});
				data.matchingAnswers.push(name.join(' '))
			}
			res.send(data);
		}
	});
});

module.exports = router;