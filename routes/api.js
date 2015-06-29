//api.js

var express = require('express');
var router = express.Router();
var quiz = require('./api/quiz');
var leaderboard = require('./api/leaderboard');

router.use('/quiz', quiz);
router.use('/leaderboard', leaderboard);



module.exports = router;