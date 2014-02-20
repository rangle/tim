angular.module('timApp')

  .controller('TasksPromiseCtrl', function ($scope) {
    $scope.tasks = [
      {
        title: 'Get the milk',
        status: 'done'
      },
      {
        title: 'Pickup the kid',
        status: 'todo'
      }
    ];
  });