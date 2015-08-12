var express = require('express');
var router = express.Router();
var path = require('path');
var ldap = require('ldapjs-hotfix');
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

router.get('/logout', function(req, res) {
    var destination;
    if(req.query.error) {
        destination = '/?error=' + req.query.error;
    } else {
        destination = '/';
    }


    if(req.cookies.login){
        db.query('DELETE FROM tokens WHERE cookie=?', req.cookies.login, function(err, message){
            res.clearCookie('login');
            res.redirect(destination);
        });
    } else {
        res.redirect(destination);
    }
});

router.get('/', function(req, res, next) {
    if(req.cookies.login){
        res.redirect('/taker');
    }else{
        if(req.query.error) {
            var errorType = decodeURIComponent(req.query.error);

            if(errorType === 'invalidToken') {
                res.render('index', {invalidToken: true});
            } else if (errorType === 'badCredentials') {
                res.render('index', {badCredentials: true});
            }
        } else {
            res.render('index');
        }
    }
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    if(!username || !password){
        var errorType = encodeURIComponent('badCredentials');
        res.redirect('/?error=' + errorType);
        return;
    }

    if(req.cookies.login){
        res.redirect('/taker');
        return;
    }

    var tlsOptions = { 'rejectUnauthorized': false }
    var client = ldap.createClient({
        url: 'ldaps://dc3-stl.schafer.lan:636',
        tlsOptions: tlsOptions
    });

    if (username == 'proj-1189-bind') {
        console.log("ALERT: Logging in with the Resource Account");
        var bindPath = 'CN='+ username +',OU=ServiceAccounts,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan';
    }
    else {
        var bindPath = 'CN=' + username + ',OU=Employees,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan';
    }

    client.bind(bindPath, password, function(err, ldapRes) {
        if(err){
            console.log(err.message);
            var errorType = encodeURIComponent('badCredentials');
            res.redirect('/?error=' + errorType);
        }else{
            var cookie = guid();
            convert.nameToId(username, function(result){
                if(!result){
                    db.query("INSERT INTO users (name) VALUES(?)", username, function(err, message){
                        convert.nameToId(username, function(result){
                            db.query("INSERT INTO tokens SET ?", {cookie: cookie, userid: result}, function(err, message){
                                if(err){
                                    res.redirect('/');
                                }else{
                                    db.query("INSERT INTO photoMatchStats SET userId=?", result, function(err, message) {
                                        res.cookie('login', cookie, {path: '/', maxAge: 365 * 24 * 60 * 60 * 1000});
                                        res.redirect('/taker');
                                    });
                                }
                            });
                        });
                    });
                }else{
                    db.query("INSERT INTO tokens SET ?", {cookie: cookie, userid: result}, function(err, message){
                        if(err){
                            res.redirect('/');
                        }else{
                            res.cookie('login', cookie, {path: '/', maxAge: 365 * 24 * 60 * 60 * 1000});
                            res.redirect('/taker');
                        }
                    });
                }
            });
            client.unbind(function(err) {if (err) console.log("You cannot leave the LDAP!!!!"); else console.log("Unbinding from the LDAP!")});
        }
    });
});

module.exports = router;