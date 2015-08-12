var helper = require('./updateUserTableHelpers');

function deleteNonEmployees(callback) {
	helper.ldapEmployees(function(employees){
		helper.databaseUsers(function(users){
			for(var i = 0; i < users.length; i++){
				if(employees.indexOf(users[i]) == -1){
					helper.deleteUser(users[i]);
				}
			}
			callback();
		});
	});
}

module.exports = {
	deleteNonEmployees: deleteNonEmployees
};