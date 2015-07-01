var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.cookies.login){
        res.redirect('/taker');
    }else{
        var bad = decodeURIComponent(req.query.badCredentials);
        var showBadCredentialsError = false;
        if(bad=='true') {
            showBadCredentialsError = true;
        }

        res.render('index', { showBadCredentialsError: showBadCredentialsError });
    }
});

module.exports = router;