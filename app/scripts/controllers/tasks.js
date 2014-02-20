'use strict';

angular.module('timApp')
  .controller('TasksCtrl', function ($scope, Task) {
    $scope.tasks = Task.query();
    $scope.title.title = "TASKS RULE!"
  })
  .controller('TasksViewCtrl', function ($scope, $routeParams, Task) {
    $scope.task = Task.get({task_id: $routeParams.task_id});
  })
  .controller('TasksNewCtrl', function ($scope, Task) {
    $scope.task = {};

    $scope.save = function() {
      console.log("task save goes here");
      Task.save($scope.task);
    };
  })
  .controller('TasksEditCtrl', function ($scope, $routeParams, Task) {
    $scope.task = Task.get({task_id: $routeParams.task_id});

    $scope.save = function() {
      console.log("task update goes here");
      Task.update($scope.task);
    };

  });