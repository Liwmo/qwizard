var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.cookies.login){
        res.redirect('/taker');
    }else{
        next();
    }
});

module.exports = router;