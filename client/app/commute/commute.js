angular.module('commutely.commute', [])
.controller('CommController', function ($scope, Comm) {  
  
  $scope.user = {};

  $scope.getCommute = function () {
    Comm.getCommute($scope.user)
      .then(function (data) {
        //assign data to scope
      })
      .catch( function (error) {
        console.error(error);
      });
  };

});