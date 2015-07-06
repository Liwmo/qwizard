var express = require('express');
var router = express.Router();
var path = require('path');
var ldap = require('ldapjs');
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

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if(!username || !password){
    	res.redirect('/');
    	return;
    }

	if(req.cookies.login){
		res.redirect('/taker');
		return;
	}

    //console.log("This is " + username + " of " + password);
    tlsOptions = { 'rejectUnauthorized': false }
	var client = ldap.createClient({
		url: 'ldaps://dc3-stl.schafer.lan:636',
		tlsOptions: tlsOptions
	});

	if (username = 'proj-1189-bind') {
		var bindPath = 'CN=' + username + ',OU=ServiceAccounts,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan';
	}
	else {
		'CN=' + username + ',OU=Employees,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan'
	}

    client.bind(bindPath, password, function(err, ldapRes) {
    	if(err){
    		console.log(err.message);
			var badCredentials = encodeURIComponent('true');
    		res.redirect('/?badCredentials=' + badCredentials);
    	}else{
    		var cookie = guid();
			convert.nameToId(username, function(result){
				if(!result){
					db.getConnection(function(err, connection){
						var insert = connection.query("INSERT INTO users (name) VALUES(?)", username, function(err, message){
						});
						convert.nameToId(username, function(result){
							var query = connection.query("INSERT INTO tokens SET ?", {cookie: cookie, userid: result}, function(err, message){
								if(err){
									res.redirect('/');
								}else{
									res.cookie('login', cookie, {maxAge: 365 * 24 * 60 * 60 * 1000});
									res.redirect('/taker');
								}
							});
							connection.release();
						});
					});
				}else{
					db.getConnection(function(err, connection){
						var query = connection.query("INSERT INTO tokens SET ?", {cookie: cookie, userid: result}, function(err, message){
							if(err){
								res.redirect('/');
							}else{
								res.cookie('login', cookie, {maxAge: 365 * 24 * 60 * 60 * 1000});
								res.redirect('/taker');
							}
						});
						connection.release();
					});
				}
			});
    		client.unbind(function(err) {if (err) console.log("You cannot leave the LDAP!!!!"); else console.log("Unbinding from the LDAP!")});
    	}
    });
});


module.exports = router;