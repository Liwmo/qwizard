var express = require('express');
var router = express.Router();
var auth = require('../authentication');

var publish = require('./maker/quiz');
var employees = require('./maker/employees');
var manage = require('./maker/manage');

router.all('/*', auth.authenticateMaker);

router.use('/quiz', publish);
router.use('/randomEmployees', employees);
router.use('/manage', manage);
module.exports = router;