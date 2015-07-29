'use strict';

describe('Quiz view', function() {
    var $scope;
    var routeParams = {id: 1456879};
    var quizFactory = { postQuiz: function(){}, getQuiz: function() {} };
    var notificationFactory = { addNotification: function() {}, removeNotification: function() {} };
    var location = { path: function() {} };

    beforeEach(module('app'));
    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('quiz', {
        	$scope: $scope,
        	$routeParams: routeParams,
            quizFactory: quizFactory,
            notificationFactory: notificationFactory,
            $location: location
        });
    }));

    it('Should have scope.name', inject(function($controller) {
        expect($scope.name).toBeTruthy();
    }));

    it('should have a default currentQuestion', function() {
        expect($scope.currentQuestion).toEqual(0);
    });    

    describe('#next', function() {
        it('should increment currentQuestion', function() {
            $scope.next();
            expect($scope.currentQuestion).toEqual(1);

            $scope.next();
            expect($scope.currentQuestion).toEqual(2);
        });    
    });

    describe('#prev', function() {
        it('should decrement currentQuestion', function() {
            $scope.next();
            $scope.next();
            $scope.next();

            $scope.prev();
            expect($scope.currentQuestion).toEqual(2);

            $scope.prev();
            expect($scope.currentQuestion).toEqual(1);
        });    
    });

    describe('#submit', function() {
        it('should post quiz', function() {
            var called = false;
            quizFactory.postQuiz = function() {
                called = true;
            };

            $scope.submit();

            expect(called).toBe(true);
        });

        it('should post using correct quiz id', function() {
            var givenQuizId;
            quizFactory.postQuiz = function() {
                givenQuizId = arguments[0]
            };

            $scope.submit();

            expect(givenQuizId).toBe(routeParams.id);
        });

        it('should post with callback to add notifications', function() {
            var callback, notificationText, removeNotificationCallback;
            quizFactory.postQuiz = function() {
                callback = arguments[1]
            };

            notificationFactory.removeNotification = function() {
                removeNotificationCallback = arguments[1];
            };
            notificationFactory.addNotification = function() {
                notificationText = arguments[0];
            };

            $scope.name = "amazing quiz"

            $scope.submit();
            callback({});
            removeNotificationCallback();

            expect(notificationText).toBe("Thanks for taking the amazing quiz quiz! Your results will be available soon!");
        });

        it('should post with callback to relocate to /', function() {
            var postQuizCallback, relocationPath, removeNotificationCallback;
            quizFactory.postQuiz = function() {
                postQuizCallback = arguments[1]
            };
            notificationFactory.removeNotification = function() {
                removeNotificationCallback = arguments[1];
            };
            location.path = function() {
                relocationPath = arguments[0];
            };
            
            $scope.submit();
            postQuizCallback({});
            removeNotificationCallback();

            expect(relocationPath).toBe("/");
        });


        it('should not relocate to / when remove notification hasn\'t been called yet', function() {
            var postQuizCallback, relocationPath = null;
            quizFactory.postQuiz = function() {
                postQuizCallback = arguments[1]
            };
            location.path = function() {
                relocationPath = arguments[0];
            };
            
            $scope.submit();
            postQuizCallback({});

            expect(relocationPath).toBe(null);
        });

        it('should call remove notification only in callback of postQuiz', function() {
            var called = false, callback;
            quizFactory.postQuiz = function() {
                callback = arguments[1]
            };
            notificationFactory.removeNotification = function() {
                called = true;
            };

            expect(called).toBe(false);

            $scope.submit();
            expect(called).toBe(false);

            callback({});
            expect(called).toBe(true);
        });

        it('should remove notification for submitted quiz', function() {
            var id, callback;
            quizFactory.postQuiz = function() {
                callback = arguments[1]
            };
            notificationFactory.removeNotification = function() {
                id = arguments[0].id;
            };

            $scope.submit();
            callback({});

            expect(id).toBe(routeParams.id);
        });
    });
    
});