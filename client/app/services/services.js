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
.factory('Route', function ($http) {
    var getRoute = function (user) {
          // var directionsDisplay = new google.maps.DirectionsRenderer
          var directionsService = new window.google.maps.DirectionsService
          var selectedMode = document.getElementById('mode').value;
          directionsService.route({
            origin: user.origin,  // Haight.
            destination: user.destination,  // Ocean Beach.
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
        getRoute: getRoute
    };
})
.factory('Comm', function ($http) {
    var getCommute = function (user) {
        
        var formatTime = function (date) {
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        };
        
        //assume minutes
        user.duration = 30;
        user.arrivalTime = new Date('February 17, 2016 08:30:00');
        user.departureTime = new Date(user.arrivalTime - (user.duration * 60000));
        user.departureTime = formatTime(user.departureTime);
    };

    return {
        getCommute: getCommute
    };
});