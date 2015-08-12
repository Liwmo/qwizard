var helper = require('./updateUserTableHelpers');

function deleteNonEmployees(callback) {
	helper.ldapEmployees(function(employees){
		helper.databaseUsers(function(users){
			var count = 0;
			var total = 0;

			var tryDone = function(){
				count++;
				if(count == total){
					callback(null, "Deleted " + count + " users.");
				}
			};

			for(var i = 0; i < users.length; i++){
				if(employees.indexOf(users[i]) == -1){
					console.log("Deleting: " + users[i]);
					helper.deleteUser(users[i], tryDone);
					total++;
				}
			}
			if (total == 0) {
				callback(null, "Deleted " + count + " users.");
			};
		});
	});
}

module.exports = {
	deleteNonEmployees: deleteNonEmployees
};