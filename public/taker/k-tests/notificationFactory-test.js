'use strict'

describe('notificationFactory tests', function() {
	var factory;
	var notification;
	var mockUrl;

	var mockHttp;

	beforeEach(module('app'));
	beforeEach(inject(function($httpBackend, notificationFactory){
		factory = notificationFactory;
		mockHttp = $httpBackend;
	}));

	it('should not delete a notification that leads back to the dashboard', function(done) {
		var data = [];
		notification = {
			text: 'I am a notification that leads back to the dashboard',
			link: '#/'
		};
		mockHttp.expectGET('/api/notification').respond(data);

		factory.notifications = [notification];

		factory.refreshNotifications(function() {
			expect(factory.notifications.length).toEqual(1);
			expect(factory.notifications[0]).toEqual(notification);
		});

		done();
	});
});