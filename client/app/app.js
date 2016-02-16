angular.module('commutely', [
  'commutely.services',
  'commutely.auth',
  'commutely.commute',
  'commutely.google',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
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
    .otherwise({
      redirectTo: '/login'
    });

    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDa46pNBVjqTOKMkaA9dgg9jIgnAstRd0Y',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
});
