angular.module('commutely.commute', [])
.controller('CommController', function ($scope, Comm) {  
  
  $scope.user = {};

  $scope.getCommute = function () {
    Comm.getCommute($scope.user);
      // .then(function (data) {
        
      // })
      // .catch( function (error) {
      //   console.error(error);
      // });
  };

});