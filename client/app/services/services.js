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
          // var directionsDisplay = new google.maps.DirectionsRenderer
          var directionsService = new window.google.maps.DirectionsService
          var selectedMode = document.getElementById('mode').value;
          directionsService.route({
            origin: "1844 Vine St, Berkeley CA 94703",  // Haight.
            destination: "944 Market St, San Francisco, CA 94102",  // Ocean Beach.
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode[selectedMode],
            transitOptions: {
              arrivalTime: new Date('February 17, 2016 08:30:00')
            }
          }, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              console.log(response);
              // directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    };

    return {
        getCommute: getCommute
    };
});