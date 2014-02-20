'use strict';
var expect = chai.expect;
xdescribe('tasks', function () {

  var httpGet;

  // load the controller's module
  beforeEach(module('timApp'));
  beforeEach(module(function($provide){
    // $provide.service('$q', function () {
    //   return Q;
    // });
    $provide.service('$http', function() {
      var service = {};
      var deferred = Q.defer();
      var items = [
        {
          "title": "Get the milk",
          "status": "done"
        }//,
        // {
        //   "title": "Pickup the kid",
        //   "status": "todo"
        // }
      ];
      deferred.resolve({data: items});
      httpGet = sinon.spy(function () {
        return deferred.promise;
      });
      console.log(httpGet, httpGet.should);
      service.get = httpGet;

      return service;
    })
  }));

  // var scope;

  // Initialize the controller and a mock scope
  // beforeEach(inject(function ($controller, $rootScope) {
  //   scope = $rootScope.$new();
  //   MainCtrl = $controller('MainCtrl', {
  //     $scope: scope
  //   });
  // }));

  // it('should attach a list of awesomeThings to the scope', function () {
  //   expect(scope.awesomeThings.length).toBe(3);
  // });

  it('tasks should get loaded', function(done) {
    inject(function (tasks) {
      var promise = tasks.getMyTasks();
      expect(promise).to.not.be.undefined;

      promise
        .then(function (myTasks) {
          expect(myTasks.length).to.equal(2);
          expect(httpGet.called).to.be.true;
          done();
        })
        .then(null, done);
    });
  });

  it('testing the controller', function(done) {
    inject(function ($controller, $rootScope) {
      var scope = {};
      var tasksCtrl = $controller('TasksCtrl', {$scope: scope });
      setTimeout(function() {
        expect(scope.tasks.length).to.equal(2);
        done();
      }, 100);
    });
  });


});
