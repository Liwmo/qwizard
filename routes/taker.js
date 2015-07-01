var express = require('express');
var router = express.Router();
var path = require('path');
var ldap = require('ldapjs');
var db = require('../database/db');

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if(!username || !password){
    	res.redirect('/');
    	return;
    }
    //console.log("This is " + username + " of " + password);
    tlsOptions = { 'rejectUnauthorized': false }
	var client = ldap.createClient({
		url: 'ldaps://dc3-stl.schafer.lan:636',
		tlsOptions: tlsOptions
	});

    client.bind('CN=' + username + ',OU=Employees,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan', password, function(err, ldapRes) {
    	if(err){
    		console.log(err.message);
    		res.redirect('/');
    	}else{
    		var cookie = guid();
    		db.getConnection(function(err, connection){
    			var query = connection.query("INSERT INTO tokens SET ?", {cookie: cookie, user: username}, function(err, message){
    				if(err){
                        console.log("Couldn't add cookie to DB.  Redirecting to login page");
    					res.redirect('/');
    				}else{
    					res.cookie('login', cookie, {maxAge: 365 * 24 * 60 * 60 * 1000});
    					res.redirect('/taker');
    				}
    			});
    			connection.release();
    		});
    		client.unbind(function(err) {if (err) console.log("You cannot leave the LDAP!!!!"); else console.log("Unbinding from the LDAP!")});
    	}
    });
});


module.exports = router;