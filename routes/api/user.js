var express = require('express');
var router = express.Router();
var db = require('../../database/db');
var convert = require('../userConversion');

router.route('/role')
    .get(function(req, res) {
        convert.cookieToId(req.cookies.login, function(userId) {
            db.query('SELECT role FROM users WHERE id=?', userId, function(err, result) {
                 if(err) {
                    console.log("ERROR: SQL query error");
                     res.send({error: err});
                 } else if (!result.length) {
                    var errMsg = "Unable to lookup specified user in database!";
                    console.log(errMsg);
                    res.send({error: errMsg});
                 } else {
                         res.send(result[0]);
                 }
              });
        });
    });

router.route('/id')
    .get(function(req, res) {
        convert.cookieToId(req.cookies.login, function(userId) {
            if(userId){
                res.send({id: userId});
            }else{
                var errMsg = 'no associated userId';
                console.log(errMsg);
                res.send({error: errMsg});
            }
        });
    });

router.route('/stats')
    .get(function(req, res) {
        var today = new Date();
        today = today.toISOString().substr(0, 10);
        convert.cookieToId(req.cookies.login, function(userId) {
            var apiResult = {};
            if(userId){
                var statsQuery = 'select sum(r.points) as userPoints, count(r.quizid) as totalQuizzes, p.matches, sum(q.totalPoints) as totalPoints ' +
                                'from results r, photoMatchStats p, quizzes q ' +
                                'where p.userId=? and r.userid=p.userId and r.quizid=q.id and q.results<= ?';
                db.query(statsQuery, [userId, today], function(err, statResult) {
                    if (err) {
                        console.log("ERROR: unable to get stats" + err);
                    }
                    //Set the values so far
                    apiResult.avgScore = statResult[0].userPoints/statResult[0].totalPoints || null;
                    apiResult.totalQuizzes = statResult[0].totalQuizzes || 0;
                    apiResult.matches = statResult[0].matches || 0;
                    res.send(apiResult);
                });
            }else{
                var errMsg = 'no associated userId';
                console.log(errMsg);
                res.send({error: errMsg});
            }
        });
    });

router.route('/name')
    .get(function(req, res) {
        convert.cookieToName(req.cookies.login, function(username) {
            if(!username) {
                console.log("ERROR: unable to get username");
                res.send({error: "unable to get username"});
            } else {
                res.send(username);
            }
        });
    });

module.exports = router;
