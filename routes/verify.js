var express = require('express');
var router = express.Router();
var db = require('../database/db');
var convert = require('./userConversion');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/* GET users listing. */
router.get('/:token', function(req, res, next) {
	console.log(req.params.token);
	console.log(req.query.redirect);

	db.query('Select id from emailTokens where token=?', req.params.token, function(err, message){
		var cookie = guid();
		if(err || !message.length){
      var errorType = encodeURIComponent('invalidToken');
      res.redirect('/logout?error=' + errorType);
		}else{
			console.log(message);
			db.query("DELETE FROM emailTokens where token=?", req.params.token);
			db.query("DELETE FROM tokens WHERE cookie=?", req.cookies.login);
			db.query("INSERT INTO tokens SET ?", {cookie: cookie, userid: message[0].id}, function(err, message){
                if(err){
                    res.redirect('/');
                }else{
                    res.cookie('login', cookie, {maxAge: 365 * 24 * 60 * 60 * 1000});
                    res.redirect(req.query.redirect);
                }
            });
		}
	});
});

module.exports = router;