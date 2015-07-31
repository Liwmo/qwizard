'use strict';

describe('employee factory tests', function(){
	var factory;
	var quiz;
	var mockUrl;

	var mockHttp;

	beforeEach(module('app'));
	beforeEach(inject(function($httpBackend, employeeFactory){
		factory = employeeFactory;
		mockHttp = $httpBackend;
	}));

	it('getRandomEmployees- should hit the endpoint for randomEmployees', function(done){
		var str = Math.random().toString();
		mockHttp.expectGET('/api/maker/randomEmployees').respond(str);
		factory.getRandomEmployees(function(data){
			expect(data).toBe(str);
			done();
		});
		mockHttp.flush();
	});
});