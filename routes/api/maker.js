var express = require('express');
var router = express.Router();
var auth = require('../authentication');

var publish = require('./maker/quiz');

router.all('/*', auth.authenticateMaker);

router.use('/quiz', publish);

module.exports = router;