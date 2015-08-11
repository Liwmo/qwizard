var setter = require('quizUserCountSetter');

setter.updateUserCount(function(err, message) {
	if(err)
	{
		console.log(err);
		process.exit(1);
	}
	console.log(message);
	process.exit();
});