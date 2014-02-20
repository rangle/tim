'use strict';

angular.module('timApp')
  .controller('LoginCtrl', function ($scope) {

  $scope.onLogin = function(user) {
    $http({
      method: 'POST',
      url: '/login',
      data: {
        user: user
      }
    }).success(function(data) {
      // user
    });

  $scope.$watch('user.email', function(newVal,oldVal){
    if (newVal === oldVal) return;

    if(newVal === "nick@rangle.io"){
      $scope.alert.message="Don't use " + newVal + " as an email";
    }
  });
};
});
