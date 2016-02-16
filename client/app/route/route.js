angular.module('commutely.route', [])
.controller('RouteController', function ($scope, Route) {  
  
  $scope.user = {};

  $scope.getRoute = function () {
    Route.getRoute($scope.user);
      // .then(function (data) {
        
      // })
      // .catch( function (error) {
      //   console.error(error);
      // });
  };

});