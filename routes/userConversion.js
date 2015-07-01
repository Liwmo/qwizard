var db = require('../database/db');

var convert = {};

convert.idToName = function(id, callback){
    db.getConnection(function(err, connection){
        var query = connection.query("SELECT name FROM users WHERE id=?", id, function(err, message){
            if(err || message.length == 0){
                callback(false);
            }else{
                callback(message[0].name);
            }
        });
        connection.release();
    });
};

convert.nameToId = function(name, callback){
    db.getConnection(function(err, connection){
        var query = connection.query("SELECT id FROM users WHERE name=?", name, function(err, message){
            if(err || message.length == 0){
                callback(false);
            }else{
                callback(message[0].id);
            }
        });
        connection.release();
    });
};

module.exports = convert;