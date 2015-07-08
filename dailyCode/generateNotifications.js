var db = require('../database/db');

var today = (new Date()).toISOString().substr(0,10);

//   insert into notifications (quizId,userId,typeId)  select q.id, u.id, 1  from quizzes q join users u where q.publish = '2015-07-08'

var addAvailableNotifications = function(callback, onError) {
	var query =  'insert into notifications (quizId, userId, typeID) ';
		query += 'select q.id, u.id, 1 from quizzes q join users u where q.publish=?';

	db.query(query, today, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log("success");
		}
		callback();
	});
};

var addResultsNotifications = function(callback, onError) {
	var query =  'insert into notifications (quizId, userId, typeID) ';
		query += 'select q.id, u.id, 2 from quizzes q join users u where q.results=?';

	db.query(query, today, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log("success");
		}
		callback();
	});
};

var accomplishedExit = function() {
	process.exit();
};


var errorExit = function() {
	console.log("did not succeed");
	process.exit();
};

addAvailableNotifications(function(){
	addResultsNotifications(accomplishedExit, errorExit);
}, errorExit);