angular.module('commutely.auth', [])
.controller('AuthController', function ($scope, $window, $location, Auth) {
  
  $scope.user = {};

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.commutely', token);
        $location.path('/commute');
      })
      .catch( function (error) {
        console.error(error);
      });
  };

  $scope.click = Auth.signup;

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.commutely', token);
        $location.path('/commute');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});