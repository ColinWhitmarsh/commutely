angular.module('commutely.route', [])
.controller('RouteController', function ($scope, Route) {  
  
  $scope.user = {};

  $scope.saveRoute = function () {
    Route.saveRoute($scope.user)
  };

});