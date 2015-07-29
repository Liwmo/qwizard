var express = require('express');
var router = express.Router();
var auth = require('../authentication');

var publish = require('./maker/quiz');
var employees = require('./maker/employees');

router.all('/*', auth.authenticateMaker);

router.use('/quiz', publish);
router.use('/randomEmployees', employees);
module.exports = router;