//api.js

var express = require('express');
var router = express.Router();
var db = require('../database/db.js');
var auth = require('./authentication');

var quiz = require('./api/quiz');
var leaderboard = require('./api/leaderboard');
var userScore = require('./api/userScore');
var user = require('./api/user');
var notifications = require('./api/notifications');

router.all('/*', auth.authenticateCookie);

router.use('/quiz', quiz);
router.use('/leaderboard', leaderboard);
router.use('/userscore', userScore);
router.use('/user', user);
router.use('/notifications', notifications);

module.exports = router;