'use strict';

angular.module('timApp')
  .controller('TasksCtrl', function ($scope, Task) {
    $scope.tasks = Task.query();

    $scope.title.title = "TASKS RULE!"

    $scope.save = function() {
      console.log("task save goes here");
    };
  });
