angular.module('timApp')

.directive('timTask', function(tasks) {
  return {
    replace: false,
    scope: {},
    templateUrl: '/views/taskDirective.html',
    link: function(scope, iElement, iAttrs) {
      tasks.getMyTasks()
        .then(function(myTasks) {
          var taskNumber = parseInt(iAttrs.taskNumber);
          console.log('Task number: ', taskNumber, ' of ', myTasks.data);
          scope.task = myTasks.data[taskNumber];
          scope.showButton = iAttrs.showButton;
        })
        .then(null, function(error) {
          console.error(error);
        });
    }
  };
});