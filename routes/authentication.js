var db = require('../database/db.js');
var convert = require('./userConversion');

module.exports.authenticateCookie = function(req, res, next) {
    console.log('route caught, running authenticateCookie');
    db.getConnection(function(err, connection){
        if(!err){
            var query = connection.query("select * from tokens where cookie=?", req.cookies.login, function(err, message){
                connection.release();
                if(!err && message.length){
                    console.log("cookie authenticated");
                    next();
                }else{
                    res.send({error: 'improper credentials'});
                }
            });
        }else{
            res.send({error: 'no db connection'});
        }
    });
};

module.exports.authenticateMaker = function(req, res, next) {
    console.log('route caught, running authenticateRole');
    db.getConnection(function(err, connection) {
        if(err) {
            res.send({error: 'no db connection'});
            return;
        }

        convert.cookieToId(req.cookies.login, function(userId) {
            var query = connection.query('SELECT role FROM users WHERE id=?', userId, function(err, result) {
                connection.release();
                if(err || !result.length) {
                    res.send({error: 'unable to authenticate'});
                }
                else if(result[0].role < 1) {
                    res.send({error: 'not authorized as a quiz maker'});
                }
                else {
                    console.log('authenticated as a maker');
                    next();
                }
            });
            console.log(query.sql);
        });
    });
};