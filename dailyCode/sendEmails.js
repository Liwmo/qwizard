var emailGenerator = require('./emailGenerator');

//task engine
var tasks = new (function(){
	var self = this;
	var list = [];

	var next = function(data){
		if(list.length){
			var task = list.shift();
			task(next, data);
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
 	.add(emailGenerator.getBody)
 	.add(emailGenerator.getQuizzes)
 	.add(emailGenerator.getUsers)
 	.add(emailGenerator.generateTokens)
 	.add(emailGenerator.insertTokens)
 	.add(emailGenerator.emails.send)
 	.add(process.exit)
 	.start();