var express = require('express');
var router = express.Router();
var db = require('../database/db');

router.get('/logout', function(req, res) {
    console.log('logging out');
    if(req.cookies.login){
        db.getConnection(function(err, connection){
            var query = connection.query('DELETE FROM tokens WHERE cookie=?', req.cookies.login, function(err, message){
                res.clearCookie('login');
                res.redirect('/');
            });
        });
    }else{
        res.redirect('/');
    }
});

router.get('/', function(req, res, next) {
    if(req.cookies.login){
        res.redirect('/taker');
    }else{
        next();
    }
});

module.exports = router;