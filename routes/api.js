//api.js

var express = require('express');
var router = express.Router();
var quiz = require('./api/quiz');
var leaderboard = require('./api/leaderboard');
var userScore = require('./api/userScore');

router.use('/quiz', quiz);
router.use('/leaderboard', leaderboard);
router.use('/userscore', userScore);


module.exports = router;