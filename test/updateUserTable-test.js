var updateUserTable = require('../dailyCode/updateUserTable');
var helpers = require('../dailyCode/updateUserTableHelpers');
var assert = require('assert');
var sinon = require('sinon');

describe('Update User Table Tests', function(){
	var deletedFive = false;
	var deletedThree = false;
	var ldapEmployees = ['first.last1','first.last2','first.last4','first.last6'];
	var databaseUsers = ['first.last1','first.last2','first.last3','first.last4','first.last5','first.last6'];
	
	beforeEach('stub all helper functions to return dummy data', function(){
		deletedFive = false;
		deletedThree = false;

		sinon.stub(helpers, 'ldapEmployees', function(callback){
			callback(ldapEmployees);
		});

		sinon.stub(helpers, 'databaseUsers', function(callback){
			callback(databaseUsers);
		});

		sinon.stub(helpers, 'deleteUser', function(name){
			if(name == 'first.last3'){
				deletedThree = true;
			}else if(name == 'first.last5'){
				deletedFive = true;
			}
		});		
	});

	it('should call the ldapEmployees function to get list of employees', function(done){
		updateUserTable.deleteNonEmployees(function(){
			assert.ok(helpers.ldapEmployees.called);
			done();
		});
	});

	it('should call the databaseUsers function to get list of users', function(done){
		updateUserTable.deleteNonEmployees(function(){
			assert.ok(helpers.databaseUsers.called);
			done();
		});
	});

	it('should call the deleteUser function twice with non-employees', function(done){
		updateUserTable.deleteNonEmployees(function(){
			assert.ok(helpers.deleteUser.calledTwice);
			assert.ok(deletedThree);
			assert.ok(deletedFive);
			done();
		});
	});

	afterEach('should remove the stubs', function(){
		helpers.ldapEmployees.restore();
		helpers.databaseUsers.restore();
		helpers.deleteUser.restore();
	});
});