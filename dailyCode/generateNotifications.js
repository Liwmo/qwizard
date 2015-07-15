var notifications = require('./notificationGenerator');

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



tasks
	.add(notifications.addAvailableNotifications)
	.add(notifications.removeAvailableNotifications)
	.add(notifications.addResultsNotifications)
	.add(process.exit)
	.start();