angular.module('timApp')

.directive('timTask', function(tasks) {
  return {
    replace: false,
    scope: true,
    template: '{{ task.title }}'
  };
});