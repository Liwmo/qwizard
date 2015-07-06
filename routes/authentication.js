var db = require('../database/db.js');
var convert = require('./userConversion');

module.exports.authenticateCookie = function(req, res, next) {
    console.log('NOTE: route caught, running authenticateCookie');
    db.getConnection(function(err, connection) {
        if(err) {
            connection.release();
            res.send({error: 'unable to connect to database'})
        }

        var query = connection.query('SELECT * FROM tokens WHERE cookie=?', req.cookies.login, function(erro, results) {
            connection.release();
            if(err || !results.length) {
                res.send({eror: 'cookie not authenticated'});
            } else {
                console.log('NOTE: cookie authenticated');
                next();
            }
        });
        console.log('SQL: ', query.sql);
    });
};

module.exports.authenticateMaker = function(req, res, next) {
    console.log('NOTE: route caught, running authenticateRole');
    db.getConnection(function(err, connection) {
        if(err) {
            res.send({error: 'unable to connect to database'});
            connection.release();
            return;
        }

        convert.cookieToId(req.cookies.login, function(userId) {
            var query = connection.query('SELECT role FROM users WHERE id=?', userId, function(err, results) {
                connection.release();
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
            console.log('SQL:', query.sql);
        });
    });
};