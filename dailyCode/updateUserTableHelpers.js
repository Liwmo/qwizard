var ldapSearch = require('../utilities/ldapSearchWrapper');
var db = require('../database/db');

function ldapEmployees(callback){
	var searchScope = 'OU=Employees,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan';
	var options = {
		filter: '(objectClass=user)',
		scope: 'sub',
		attributes: ['cn',]
	};

	ldapSearch(searchScope, options, function(employees){
		employees.forEach(function(e, i, a){
			a[i] = e.cn;
		});
		callback(employees);
	});
}

function databaseUsers(callback){
	db.query('select name from users', function(err, message){
		if(err){
			console.log('query error!');
			process.exit(1);
		}else{
			message.forEach(function(e, i, a){
				a[i] = e.name;
			});
			callback(message);
		}
	});
}

function deleteUser(name){
	db.query('delete from users where name=?', name, function(err, message){
		if(err){
			console.log('query error!');
			process.exit(1);
		}
	});
}

module.exports = {
	ldapEmployees: ldapEmployees,
	databaseUsers: databaseUsers,
	deleteUser: deleteUser
};