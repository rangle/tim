'use strict';

angular.module('timApp')
  .controller('TasksCtrl', function ($scope, Task) {
    $scope.tasks = Task.query();

    $scope.delete = function(task){
      Task.remove(task);
      var msg="Task " + task.task + " deleted."
      console.log(msg);
      $scope.alert.message = msg;
    }

  })
  .controller('TasksViewCtrl', function ($scope, $routeParams, Task) {
    $scope.task = Task.get({task_id: $routeParams.task_id});
  })
  .controller('TasksNewCtrl', function ($scope, $location, Task) {
    $scope.task = {};

    $scope.submitForm = function() {
      // check to make sure the form is completely valid
      if ($scope.taskForm.$valid) {
        console.log("form is valid");
        
        // alert('top form!');

        var msg="Task " + $scope.task.task + " saved."
        console.log(msg);
        Task.save($scope.task);
        $scope.alert.message = msg;
        $location.path("/tasks");
      }else{
        console.log("validation failed");
      }
    };

    $scope.delete = function(){
      Task.remove($scope.task);
      console.log("task removed");
      $scope.alert.message = "Task " + $scope.task.task + " deleted.";
      $location.path("/tasks");
    }
  })
  .controller('TasksEditCtrl', function ($scope, $location, $routeParams, Task) {
    $scope.task = Task.get({task_id: $routeParams.task_id});

    $scope.submitForm = function() {
      // check to make sure the form is completely valid
      if ($scope.taskForm.$valid) {
        console.log("update form is valid");
        
        // alert('top form!');

        var msg="Task " + $scope.task.task + " saved."
        console.log(msg);
        Task.update({task_id: $scope.task.task_id},  $scope.task);
        $scope.alert.message = msg;
        $location.path("/tasks");
      }else{
        console.log("update form validation failed");
      }
    };


    $scope.save = function() {
      console.log("task update called");
      Task.update($scope.task);
      $scope.alert.message = "Task " + $scope.task.task + " saved.";
      $location.path("/tasks");
    };

    $scope.delete = function(){
      Task.remove($scope.task);
      console.log("task removed");
      $scope.alert.message = "Task " + $scope.task.task + " deleted.";
      $location.path("/tasks");
    }
  });