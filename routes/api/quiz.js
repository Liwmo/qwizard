var express = require('express');
var path = require('path');
var router = express.Router();

router.route('/')
	.get(function(req, res) {
		res.send('Hello James');
	});

router.route('/:id')
	.get(function(req, res){
		res.sendFile(path.join(__dirname, "../../mockData/mockData.json"));
	})
	.post(function(req, res){
		res.send(req.body);
	});

module.exports = router;