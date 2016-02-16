angular.module('commutely.commute', [])
.controller('CommController', function ($scope, Comm, Auth) {  
  
  $scope.user = {};

  $scope.getCommute = function () {
    Comm.getCommute($scope.user);
  };
  
  $scope.signout = Auth.signout;
});