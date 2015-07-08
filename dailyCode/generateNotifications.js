var db = require('../database/db');

var today = (new Date()).toISOString().substr(0,10);

//   insert into notifications (quizId,userId,typeId)  select q.id, u.id, 1  from quizzes q join users u where q.publish = '2015-07-08'


var query =  'insert into notifications (quizId, userId, typeID) ';
	query += 'select q.id, u.id, 1 from quizzes q join users u where q.publish=?';

db.query(query, today, function(err, message){
	if(err){
		console.log(err);
	}else{
		console.log("success");
	}
	process.exit();
});