'use strict';

angular.module('timApp.task.service', [])
  .service('Task', function Task($resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return $resource('/tasks/:task_id', null, 
      {
         'update': { method:'PUT' }
      });
  });
