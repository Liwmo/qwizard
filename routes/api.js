//api.js

var express = require('express');
var router = express.Router();
var quiz = require('./api/quiz');

router.use('/quiz', quiz);





module.exports = router;