// Basic controller

.controller('TasksCtrl', function ($scope) {
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
})

// HTML for it

<ul ng-repeat="task in tasks">
  <li>
    {{ task.title }}
    <span ng-if="task.status==='done'">√</span>
    <button ng-if="task.status!=='done'"
      ng-click='finishTask(task)'>Done
    </button>
  </li>
</ul>


// Let's get data from the server.

.controller('TasksCtrl', function ($scope, $http) {
  $http.get('/tasks.json')
    .then(function(results) {
      console.log(results.data);
      $scope.tasks = results.data;
    }, function(error) {
      console.log(error);
    });
})

// Alternative error handling

.controller('TasksCtrl', function ($scope, $http) {
  $http.get('/tasks.json')
    .then(function(results) {
      console.log(results.data);
      $scope.tasks = results.data;
    })
    .catch(function(error) {
      console.log(error);
    });
})

// The callback pattern.

getDataAsync(query, function (error, results) {
  // check for error
  // do something with the results
});

// The basic promise.

getDataAsync(query)
  .then(function (results) {
    // do something with the results
  }, function(error) {
    // do something if we got an error
  });

// Chaining promises

getDataAsync(query)
  .then(function (results) {
    return transformData(results);
  })
  .then(function (transformedResults) {
    // do something with transformed results
  }, function(error) {
    // do something if we got an error in either step
  });

// Chaining promises 2

getDataAsync(query)
  .then(function (results) {
    return transformDataAsync(results);
  })
  .then(function (transformedResults) {
    // do something with transformed results
  }, function(error) {
    // do something if we got an error in either step
  });

// Chaining promises 3

getDataAsync(query)
  .then(function (results) {
    return transformDataAsync(results);
  })
  .then(function (transformedResults) {
    // do something with transformed results
  })
  .then(null, function(error) {
    // do something if we got an error in either step
  });


// Chaining promises 4

getDataAsync(query)
  .then(function (results) {
    return transformDataAsync(results);
  })
  .then(function (transformedResults) {
    return transformDataAgainAsync(transformedResults);
  })
  .then(function (twiceTransformedResults) {
    // do something with twiceTransformedResults
  })
  .then(null, function(error) {
    // do something if we got an error in either step
  });

// Chaining promises 5

return getDataAsync(query)
  .then(function (results) {
    return transformDataAsync(results);
  })
  .then(function (transformedResults) {
    return transformDataAgainAsync(transformedResults);
  })
  .then(null, function(error) {
    // do something if we got an error in either step
  });

// Back to $http

.controller('TasksCtrl', function ($scope, $http) {
  $http.get('/tasks.json')
    .then(function(results) {
      console.log(results.data);
      $scope.tasks = results.data;
    })
    .then(null, function(error) {
      console.log(error);
    });
})

// Moving to a service

.factory('tasks', function ($http) {
  var service = {};
  service.getMyTasks = function() {
    return $http.get('/tasks.json')
      .then(function(results) {
        console.log(results.data);
        return results.data;
      });      
  };
  return service;
})

// The simplified controller

.controller('TasksCtrl', function ($scope, tasks) {
  tasks.getMyTasks()
    .then(function(results) {
      $scope.tasks = results.data;
    })
    .then(null, function(error) {
      console.log(error);
    });
})

// The payoff

.factory('tasks', function ($http) {
  var service = {};
  var taskPromise; 
  service.getMyTasks = function() {
    if (!taskPromise) {
      taskPromise = $http.get('/tasks.json')
        .then(function(results) {
          console.log(results.data);
          return results.data;
        });
    }
    return taskPromise;      
  };
  return service;
})

.factory('tasks', function ($http, $q, $timeout) {
  ...
  service.finishTask = function(task) {
    var deferred = $q.defer();

    $timeout(function() {
      task.status = 'done';
      deferred.resolve('Ok');
    }, 3000);
    return deferred.promise;
  };
});

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

//

.directive('timTask', function() {
  return {
    replace: false,
    scope: true,
    template: '{{ tasks.title }}',
  };
});

//

.directive('timTask', function() {
  return {
    replace: false,
    scope: true,
    templateUrl: '/views/taskDirective.html',
  };
});

// Transclusion

.directive('timTask', function() {
  return {
    replace: false,
    scope: true,
    transclude: true,
    templateUrl: '/views/taskDirective.html',
  };
});

<span ng-transclude/>

//

angular.module('timApp')

.directive('timTask', function(tasks) {
  return {
    replace: false,
    scope: {},
    templateUrl: '/views/taskDirective.html',
    link: function (scope, iElement, iAttrs) {
      tasks.getMyTasks()
        .then(function(myTasks) {
          var taskNumber = parseInt(iAttrs.taskNumber);
          scope.task = myTasks.data[taskNumber];
        })
        .then(null, function(error) {
          console.error(error);
        })
    }
  };
});

.directive('timTask', function(tasks) {
  return {
    replace: false,
    scope: {},
    templateUrl: '/views/taskDirective.html',
    link: function (scope, iElement, iAttrs) {
      tasks.getMyTasks()
        .then(function(myTasks) {
          var taskNumber = parseInt(iAttrs.taskNumber);
          scope.task = myTasks.data[taskNumber];
          scope.showButton = iAttrs.showButton;
        })
        .then(null, function(error) {
          console.error(error);
        })
    }
  };
});

//

