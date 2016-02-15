angular.module('commutely', [])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .when('signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    });
});
