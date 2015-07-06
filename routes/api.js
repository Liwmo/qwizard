//api.js

var express = require('express');
var router = express.Router();
var db = require('../database/db.js');

var quiz = require('./api/quiz');
var leaderboard = require('./api/leaderboard');
var userScore = require('./api/userScore');
var role = require('./api/role');
var auth = require('./authentication');

router.all('/*', auth.authenticateCookie);

router.use('/quiz', quiz);
router.use('/leaderboard', leaderboard);
router.use('/userscore', userScore);
router.use('/role', role);

module.exports = router;