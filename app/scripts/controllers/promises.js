
angular.module('timApp')

  .factory('tasks', function ($http, $q, $timeout) {
    var service = {};
    var taskPromise;
    service.getMyTasks = function() {
      if (!taskPromise) {
        taskPromise = $http.get('/tasks.json');
      }
      return taskPromise;
    };

    service.finishTask = function (task) {
      var deferred = $q.defer();
      $timeout(function () {
        task.status = 'done';
        deferred.resolve('Ok');
      }, 3000);
      return deferred.promise;
    }
    return service;
  })

  .controller('TasksPromiseCtrl', function ($scope, tasks) {
    var myTasks = tasks.getMyTasks();

    myTasks.then(function(results) {
      console.log(results.data);
      $scope.tasks = results.data;
      $scope.finishTask = function (task) {
        var promise = tasks.finishTask(task);
        promise.then(function () {
          alert('Done');
        });
      }
    })
    .then(null, function(error) {
      console.error(error);
    });
  });