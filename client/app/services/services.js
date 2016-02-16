angular.module('commutely.services', [])
.factory('Auth', function ($http, $location, $window) {
    var login = function (user) {
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: user
        })
        .then(function (resp) {
            return resp.data.token;
        });
    };

    var signup = function (user) {
        return $http({
            method: 'POST',
            url: '/api/users/signup',
            data: user
        });
    };

    var isAuth = function () {
        return !!$window.localStorage.getItem('com.commutely');
    };

    var signout = function () {
        $window.localStorage.removeItem('com.commutely');
        $location.path('/login');
    };

    return {
        login: login,
        signup: signup,
        isAuth: isAuth,
        signout: signout
    };
})
.factory('Comm', function ($http) {
    var getCommute = function (user) {
        return $http({
            method: 'GET',
            url: '',
            data: user
        })
        .then(function (resp) {
            return resp;
        });
    };

    return {
        getCommute: getCommute
    };
});