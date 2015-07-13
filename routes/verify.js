var express = require('express');
var router = express.Router();
var db = require('../database/db');
var convert = require('./userConversion');

/* GET users listing. */
router.get('/:token', function(req, res, next) {
	console.log(req.params.token);
	console.log(req.query.redirect);





	res.redirect(req.query.redirect);





});

module.exports = router;