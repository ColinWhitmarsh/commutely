angular.module('commutely.route', [])
.controller('RouteController', function ($scope, Route) {  
  
  $scope.user = {};

  $scope.getRoute = function () {
    Comm.getRoute($scope.user);
      // .then(function (data) {
        
      // })
      // .catch( function (error) {
      //   console.error(error);
      // });
  };

});