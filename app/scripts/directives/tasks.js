

// {{ task.title }}
//       <span ng-if="task.status==='done'">√</span>
//       <button ng-if="task.status!=='done'" ng-click='finishTask(task)'>Done</button>
//     </li>

angular.module('timApp')

.directive('timTask',
  function () {
    return {
      replace: false,
      template: '{{ task.title }}'
    };
  }
);