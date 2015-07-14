var db = require('../database/db');

var today = (new Date()).toISOString().substr(0,10);

//   insert into notifications (quizId,userId,typeId)  select q.id, u.id, 1  from quizzes q join users u where q.publish = '2015-07-08'

var tasks = new (function(){
	var self = this;
	var list = [];

	var next = function(){
		if(list.length){
			var task = list.shift();
			task(next);
		}
	};

	self.add = function(task){
		list.push(task);
		return self;
	};

	self.start = function(){
		next();
	};
})();

var addAvailableNotifications = function(next) {
	var query =  'insert into notifications (quizId, userId, typeID) ';
		query += 'select q.id, u.id, 1 from quizzes q join users u where q.publish=?';
	db.query(query, today, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log("success");
		}
		next();
	});
};

var removeAvailableNotifications = function(next){
	var query =  'delete from notifications ';
		query += 'where typeId=1 and quizId in ';
		query += '(select quizId from quizzes where results=?)';

	db.query(query, today, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log("success");
		}
		next();
	});
};

var addResultsNotifications = function(next) {
	var query =  'insert into notifications (quizId, userId, typeID) ';
		query += 'select q.id, u.id, 2 from quizzes q join users u where q.results=?';

	db.query(query, today, function(err, message){
		if(err){
			console.log(err);
		}else{
			console.log("success");
		}
		next();
	});
};

var accomplishedExit = function() {
	process.exit();
};

tasks
	.add(addAvailableNotifications)
	.add(removeAvailableNotifications)
	.add(addResultsNotifications)
	.add(accomplishedExit)
	.start();