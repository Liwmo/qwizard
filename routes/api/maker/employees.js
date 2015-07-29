var express = require('express');
var router = express.Router();
var db = require('../../../database/db.js');

router.get('/', function(req, res){
	res.send({
		matchingClues: ["logo-square-12", "icon-info", "icon-check", "icon-menu"],
		matchingAnswers: ["logo-square-12", "icon-info", "icon-check", "icon-menu"]
	});
});

module.exports = router;