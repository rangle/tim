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
      .when('/tasks/new', {
        templateUrl: 'views/taskedit.html',
        controller: 'TasksNewCtrl'
      })
      .when('/tasks/:task_id/edit', {
        templateUrl: 'views/taskedit.html',
        controller: 'TasksEditCtrl'
      })
      .when('/tasks/:task_id', {
        templateUrl: 'views/taskview.html',
        controller: 'TasksViewCtrl'
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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope,$location){
    $rootScope.alert = { message: null };
    $rootScope.user = { username: null };

    $rootScope.$on("$locationChangeStart", function(event){
      $rootScope.alert = { message: null };
      console.log("$locationChangeStart called");
      //event.preventDefault();
    });
  });
