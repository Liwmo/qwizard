app.controller('publish-quiz', ['$scope', '$routeParams', 'makerQuizFactory',
 function($scope, $routeParams, makerQuizFactory) {

  makerQuizFactory.getQuiz($routeParams.id);
  //TODO: QuizName should be grabbed using a factory
  $scope.quizName = makerQuizFactory.currentQuiz.name;

}]);
