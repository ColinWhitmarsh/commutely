angular.module('commutely', [
  'commutely.services',
  'commutely.auth',
  'commutely.commute',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/commute', {
      templateUrl: 'app/commute/commute.html',
      controller: 'CommController'
    })
    .when('/route', {
      templateUrl: 'app/route/route.html',
      controller: 'RouteController'
    })
    .otherwise({
      redirectTo: '/login'
    });
});
