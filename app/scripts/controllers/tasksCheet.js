angular.module('timApp')

  .factory('tasks', function ($http, $q, $timeout) {
    var service = {};
    service.getMyTasks = function() {
      return $http.get('/tasks.json')
        .then(function(results) {
          console.log(results.data);
          return results.data;
        });      
    };
    service.finishTask = function(task) {
      var deferred = $q.defer();

      $timeout(function() {
        task.status = 'done';
        deferred.resolve('Ok');
      }, 3000);
      return deferred.promise;
    };

    return service;
  })

  .controller('TasksCtrl', function (tasks, $scope) {
    // $scope.tasks = [
    //   {
    //     title: 'Get the milk',
    //     status: 'done'
    //   },
    //   {
    //     title: 'Pickup the kid',
    //     status: 'todo'
    //   }
    // ];

    // $http.get('/tasks.json')
    //   .then(function(results) {
    //     console.log(results.data);
    //     $scope.tasks = results.data;
    //   }, function(error) {
    //     console.log(error);
    //   });

    tasks.getMyTasks()
      .then(function(myTasks) {
        $scope.tasks = myTasks;
        $scope.finishTask = function (task) {
          tasks.finishTask(task)
            .then(function(status) {
              alert(status);
            });
        }
      });

  });
