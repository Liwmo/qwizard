var ldapSearch = require('../utilities/ldapSearchWrapper');
var should = require('should');
var assert = require('assert');

describe('ldapSearchWrapper - Search Test', function(){
	it('should return our user when searched for', function(done){
		var opts = {
                 filter: '(objectclass=user)',
                 scope: 'sub',
                 attributes: ['cn']
        };
		ldapSearch('CN=proj-1189-bind,OU=ServiceAccounts,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan', opts, function(data){
			assert.ok(!data.error);
			assert.equal(data.length, 1);
			assert.equal(data[0].cn, 'proj-1189-bind');
			done();
		});
	});

	it('should return empty data when search returns no results', function(done){
		var opts = {
                 filter: '(objectclass=user)',
                 scope: 'sub',
                 attributes: ['cn']
        };
		ldapSearch('CN=foo,OU=ServiceAccounts,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan', opts, function(data){
			assert.equal(data.length, 0);
			done();
		});
	});

	it('should return convert binary attributes into non-strings', function(done){
		var opts = {
                 filter: '(objectClass=user)',
                 scope: 'sub',
                 attributes: ['cn', 'thumbnailPhoto']
        };
		ldapSearch('CN=steve.elfanbaum,OU=Employees,OU=UsersAccounts,OU=StLouis,DC=schafer,DC=lan', opts, function(data){
			assert.notEqual(typeof data[0].thumbnailPhoto, 'string');
			
			done();
		});
	});
});