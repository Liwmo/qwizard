var ldapSearch = require('../utilities/ldapSearchWrapper');

function getAllEmployees(callback) {
	var searchScope = 'OU=Employees,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan';
	var options = {
		filter: '(objectClass=user)',
		scope: 'sub',
		attributes: ['cn', 'displayName', 'thumbnailPhoto']
	};

	ldapSearch(searchScope, options, callback);
}

module.exports = {
	getAllEmployees: getAllEmployees
};