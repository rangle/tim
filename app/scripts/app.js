'use strict';

angular.module('timApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'timApp.task.service'
])
  .config(function ($routeProvider,$locationProvider) {
    // $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/tasks/:id/edit', {
        templateUrl: 'views/taskedit.html',
        controller: 'TasksCtrl'
      })
      .when('/tasks/:id', {
        templateUrl: 'views/taskview.html',
        controller: 'TasksCtrl'
      })
      .when('/tasks', {
        templateUrl: 'views/tasks.html',
        controller: 'TasksCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller: 'ProjectsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope){
    $rootScope.title = { title: "Don't use globals!" }
  });
