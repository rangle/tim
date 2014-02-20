'use strict';

var expect = chai.expect;
describe('tasks', function () {

  var httpGet;

  beforeEach(module('timApp'));
  beforeEach(module(function($provide) {
    $provide.factory('$http', function() {
      var service = {};
      var deferred = Q.defer();
      deferred.resolve({
        data : [
          {
            title: 'get milk'
          }
        ]
      });
      httpGet = sinon.spy(function() {
        console.log('$http.get called');
        return deferred.promise;
      });
      service.get = httpGet;
      return service;
    });
  }));

  it('2+2 should equal 4', function() {
    var x = 2+2;
    expect(x).to.equal(4);
  });

  it('tasks should get loaded', function(done) {
    inject(function(tasks) {
      tasks.getMyTasks()
        .then(function(myTasks) {
          expect(myTasks).to.be.an.array; //.to.not.be.undefined;
          // expect(myTasks.data.length).to.equal(1);
          expect(httpGet.called).to.be.true;
          httpGet.reset();
          return tasks.getMyTasks()
            .then(function(myTasks) {
              expect(myTasks).to.be.an.array;
              expect(httpGet.called).to.be.false;
              done();
            });
        })
        .then(null, done);
    });
  });

  it('controller should load tasks', function(done) {
    inject(function($controller) {
      var scope = {};
      var tasksCtrl = $controller('TasksPromiseCtrl', {
        $scope : scope
      });

      setTimeout(function() {
        expect(scope.tasks).to.be.an.array;
        // expect(scope.tasks.length).to.equal(1);
        done();
      }, 200);
    });
  })

});
