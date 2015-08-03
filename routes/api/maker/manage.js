var express = require('express');
var router = express.Router();
var db = require('../../../database/db.js');

router.get('/finished', function(req, res){
	res.send("ok");
});

module.exports = router;