var db = require('../database/db.js');
var convert = require('./userConversion');

module.exports.authenticateCookie = function(req, res, next) {
    // console.log('NOTE: route caught, running authenticateCookie');
    console.log('cookies: ', req.cookies);
    var query = db.query('SELECT * FROM tokens WHERE cookie=?', req.cookies.login || '', function(err, results) {
        if(err || !results.length) {
            console.log("ERROR: User's cookie was invalid");
            if(req.originalUrl.indexOf("api") > -1){
                res.send({error: 'cookie not authenticated'});
            }else{
                res.redirect('/logout');
                console.log("NOTE: Sending user back to the root");
            }
        } else {
            // console.log('NOTE: cookie authenticated');
            next();
        }
    });
};

module.exports.authenticateMaker = function(req, res, next) {
    // console.log('NOTE: route caught, running authenticateMaker');
    convert.cookieToId(req.cookies.login, function(userId) {
        db.query('SELECT role FROM users WHERE id=?', userId, function(err, results) {
            if(err || !results.length) {
                console.log("ERROR: User has no role");
                res.send({error: 'unable to authenticate'});
            }
            else if(results[0].role < 1) {
                console.log("ERROR: User doesn't have maker role");
                res.send({error: 'not authorized as a quiz maker'});
            }
            else {
                // console.log('NOTE: Authenticated as a maker');
                next();
            }
        });
    });
};