describe('Quiz Notifications', function() {
	var $scope;

  beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('dashboard', {$scope: $scope});
    }));
  beforeEach(function(){
  	$scope.notifications = [
        {
            text: "Quiz 235 is ready to take.",
            dest: "#/quiz"
        },
        {
            text: "Results for Quiz 234 have been released. View now >>",
            dest: "#/results"
        }
    ];
  });

  it('Should display notifications that can redirect the user to a new view', function() {
    browser.get('http://localhost:3000/taker');
    element(by.tagName('quiz-notification')).getAttribute("href");
  });

  it('Should display notifications that can redirect the user to a new view', function() {
    browser.get('http://localhost:3000/taker');
    element(by.tagName('quiz-notification')).getAttribute("href");
  });
});
