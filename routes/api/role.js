var express = require('express');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');

router.route('/')
    .get(function(req, res) {
        convert.cookieToId(req.cookies.login, function(userId) {
            db.query('SELECT role FROM users WHERE id=?', userId, function(err, result) {
                 if(err) {
                     res.send({error: err});
                 } else if (!result.length) {
                     res.send({error: "Unable to lookup specified user in database!"});
                 } else {
                         res.send(result[0]);
                 }
              });
        });
    });

module.exports = router;