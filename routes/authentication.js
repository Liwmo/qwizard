var db = require('../database/db.js');
var convert = require('./userConversion');

module.exports.authenticateCookie = function(req, res, next) {
    console.log('NOTE: route caught, running authenticateCookie');
    db.query('SELECT * FROM tokens WHERE cookie=?', req.cookies.login || '', function(err, results) {
        if(err || !results.length) {
            console.log("NOTE: User's cookie was invalid");
            res.send({error: 'cookie not authenticated'});
        } else {
            console.log('NOTE: cookie authenticated');
            next();
        }
    });
};

module.exports.authenticateMaker = function(req, res, next) {
    console.log('NOTE: route caught, running authenticateMaker');
    convert.cookieToId(req.cookies.login, function(userId) {
        db.query('SELECT role FROM users WHERE id=?', userId, function(err, results) {
            if(err || !results.length) {
                res.send({error: 'unable to authenticate'});
            }
            else if(results[0].role < 1) {
                res.send({error: 'not authorized as a quiz maker'});
            }
            else {
                console.log('authenticated as a maker');
                next();
            }
        });
    });
};