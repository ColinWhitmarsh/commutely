angular.module('commutely.route', [])
.controller('RouteController', function ($scope, Route) {  
  
  $scope.user = {};

  $scope.saveRoute = function () {
    Route.saveRoute($scope.user);
      // .then(function (data) {
        
      // })
      // .catch( function (error) {
      //   console.error(error);
      // });
  };

});