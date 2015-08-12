require('./updateUserTable').deleteNonEmployees(function(err, message) {
	if(err)
	{
		console.log(err);
		process.exit(1);
	}
	console.log(message);
	process.exit();
});