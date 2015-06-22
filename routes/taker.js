var express = require('express');
var router = express.Router();
var path = require('path');

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log("This is " + username + " of " + password);

    res.redirect('/taker');
});

module.exports = router;
