var express = require('express');
var router = express.Router();
var randomSet = require('../../../utilities/randomSet');
var db = require('../../../database/db.js');

router.get('/', function(req, res){
	db.query('SELECT id, name FROM users', function(err, message) {
		if(err || message.length < 4) {
			res.send({error: 'Unable to query database for four user ids'});
		} else {
			res.send(randomSet(message, 4));
		}
	});
});

router.get('/one', function(req, res){
	var excludeIds = req.query.current || [];
	excludeIds.forEach(function(e,i){
		excludeIds[i] = parseInt(e);
	});
	console.log(excludeIds);
	db.query('SELECT id, name FROM users', function(err, message) {
		if(err || message.length < 4) {
			res.send({error: 'Unable to query database for four user ids'});
		} else {
			res.send(randomSet(message, 1, excludeIds));
		}
	});
});

module.exports = router;