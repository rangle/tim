'use strict';

xdescribe('Controller: TaskviewCtrl', function () {

  // load the controller's module
  beforeEach(module('timApp'));

  var TaskviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TaskviewCtrl = $controller('TaskviewCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
