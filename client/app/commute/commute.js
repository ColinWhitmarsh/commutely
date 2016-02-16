angular.module('commutely.commute', [])
.controller('CommController', function ($scope, Comm) {  
  
  $scope.user = {};

  $scope.getCommute = function () {
    Comm.getCommute($scope.user);
  };

});