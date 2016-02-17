angular.module('commutely', [
  'commutely.services',
  'commutely.auth',
  'commutely.commute',
  'commutely.route',
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

    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      console.log('attach token function called');
      var jwt = $window.localStorage.getItem('com.commutely');
      if (jwt) {
        console.log('token found and request header attached');
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
});
