var db = require('../database/db');

var convert = {};

convert.idToName = function(id, callback){
    db.getConnection(function(err, connection){
        var query = connection.query("SELECT name FROM users WHERE id=?", id, function(err, message){
            connection.release();
            if(err || message.length == 0){
                callback(false);
            }else{
                callback(message[0].name);
            }
        });
    });
};

convert.nameToId = function(name, callback){
    db.getConnection(function(err, connection){
        var query = connection.query("SELECT id FROM users WHERE name=?", name, function(err, message){
            connection.release();
            if(err || message.length == 0){
                callback(false);
            }else{
                callback(message[0].id);
            }
        });
    });
};

convert.cookieToId = function(cookie, callback){
        db.getConnection(function(err, connection){
        var query = connection.query("SELECT userid FROM tokens WHERE cookie=?", cookie, function(err, message){
            connection.release();
            if(err || message.length == 0){
                callback(false);
            }else{
                callback(message[0].userid);
            }
        });
    });
};

module.exports = convert;