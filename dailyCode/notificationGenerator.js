var db = require('../database/db');

var today = (new Date()).toISOString().substr(0,10);

var addAvailableNotifications = function(next) {
	var query =  'insert ignore into notifications (quizId, userId, typeID) ';
		query += 'select q.id, u.id, 1 from quizzes q join users u where q.publish=?';
	db.query(query, today, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log("success: publish notifications added");
		}
		next();
	});
};

var removeAvailableNotifications = function(next){
	var query =  'delete from notifications ';
		query += 'where typeId=1 and quizId in ';
		query += '(select id from quizzes where results=?)';

	db.query(query, today, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log("success: old publish notifications removed");
		}
		next();
	});
};

var addResultsNotifications = function(next) {
	var query =  'insert ignore into notifications (quizId, userId, typeID) ';
		query += 'select q.id, u.id, 2 from quizzes q join users u where q.results=?';

	db.query(query, today, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log("success: results notifications added");
		}
		next();
	});
};

module.exports = {
	addAvailableNotifications: addAvailableNotifications,
	removeAvailableNotifications: removeAvailableNotifications,
	addResultsNotifications: addResultsNotifications
};