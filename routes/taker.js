var express = require('express');
var router = express.Router();
var path = require('path');
var ldap = require('ldapjs');
var db = require('../database/db');
// var passport = require('passport');
// var LdapStrategy = require('passport-ldapauth');
// var LdapSimpleStrategy = require('passport-ldapbind').Strategy;
	
// var OPTS = {
// 	server:{
// 		url: 'ldap://dc0.authdev.lan:389',
// 		// bindDn: 'cn=administrator,cn=Users,dc=authdev,dc=lan', 		// :D 
// 		// bindCredentials: 'P@$$W0rd',
// 		searchBase: 'ou=passport-ldapauth',
// 		searchFilter: '(uid={{username}})'
// 	}
// };

// passport.use(new LdapStrategy(OPTS));

//passport.use(new LdapSimpleStrategy({}));

//router.post('/', passport.authenticate('ldapauth', {session: false}));

// router.post('/', function(req, res, next) {
//   passport.authenticate('ldapauth', function(err, user, info) {
//   	console.log(err.message);
//   	if(!err)
//   		res.redirect('/taker');
//   	else
//   		res.send('error');
//   })(req, res, next);
// });

// router.post('/', function(req, res, next) {
//     var username = req.body.username;
//     var password = req.body.password;
//     console.log("This is " + username + " of " + password);

//     res.redirect('/taker');
// });

var client = ldap.createClient({
	url: 'ldap://dc0.authdev.lan:389'
});


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
    //console.log("This is " + username + " of " + password);

    client.bind('cn=administrator,cn=Users,dc=authdev,dc=lan', 'P@$$W0rd', function(err, ldapRes) {
    	if (err) {
    		console.log(err.message);
    		res.redirect('/');
    	}
    	else
    	{
    		console.log("hey you logged in successfully!");
    		var cookie = guid();
    		db.getConnection(function(err, connection){
    			console.log("INSERT INTO tokens values('" + cookie + "','" + username + "')");
    			var query = connection.query("INSERT INTO tokens values('" + cookie + "','" + username + "')", function(err, message){
    				if (err) {
    					console.log(err.message);
    					res.redirect('/');
    				}
    				else {
    					res.cookie('login', cookie, {maxAge: 900000});
    					res.redirect('/taker');
    				}

    			});
    		});
    		
    		
    	}
    	
    });

});


module.exports = router;
