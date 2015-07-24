var db = require('../../../database/db');

module.exports.generateNotifications = function(quizId){
	console.log("Generating notifications for quiz " + quizId);
	var query =  'insert into notifications (quizId, userId, typeId) ';
		query += 'select q.id, u.id, 1 from quizzes q, users u where q.id=?';

	db.query(query, quizId, function(err, message){
		if(err) {
			console.log(err);
		}else{
			console.log("Notifications generated");
		}
	});
};