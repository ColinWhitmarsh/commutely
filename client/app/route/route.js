angular.module('commutely.route', [])
.controller('RouteController', function ($scope, Route) {  
  
  $scope.user = {};

  $scope.saveRoute = function () {
    Route.saveRoute($scope.user)
  };

  $scope.init = function () {
    $(document).ready(function() {
    $('select').material_select();
});
  }

  $scope.init();
});