var db = require('../database/db');

var convert = {};

convert.idToName = function(id, callback){
    db.query("SELECT name FROM users WHERE id=?", id, function(err, message){
        if(err || message.length == 0){
            callback(false);
        }else{
            callback(message[0].name);
        }
    });
};

convert.nameToId = function(name, callback){
    db.query("SELECT id FROM users WHERE name=?", name, function(err, message){
        if(err || message.length == 0){
            callback(false);
        }else{
            callback(message[0].id);
        }
    });
};

convert.cookieToId = function(cookie, callback){
    db.query("SELECT userid FROM tokens WHERE cookie=?", cookie, function(err, message){
        if(err || message.length == 0){
            callback(false);
        }else{
            callback(message[0].userid);
        }
    });
};

convert.cookieToName = function(cookie, callback) {
    db.query("SELECT name FROM users WHERE id in (SELECT userid FROM tokens WHERE cookie=?)", cookie, function(err, message) {
        if(err || message.length == 0){
            callback(false);
        }else{
            callback(message[0].name);
        }
    });
};

module.exports = convert;