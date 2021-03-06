angular.module('commutely.services', [])
.factory('Auth', function ($http, $location, $window) {
    var login = function (user) {
        console.log('user inside login func');
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: user
        })
        .then(function (resp) {
            console.log('login resp from server');
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
.factory('Route', function ($http, $location) {
    var saveRoute = function (user) {
          var directionsService = new window.google.maps.DirectionsService
          var selectedMode = document.getElementById('mode').value;
          var selectedTime = document.getElementById('time').value;
          directionsService.route({
            origin: user.origin, 
            destination: user.destination, 
            travelMode: google.maps.TravelMode[selectedMode],
            transitOptions: {
              arrivalTime: new Date('February 17, 2016 08:30:00')
            }
          }, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                user.duration = 30;
                user.arrivalTime = new Date('February 17, 2016 08:30:00');
                user.username = 'colin';
                user.travelMode = google.maps.TravelMode[selectedMode];
                console.log(user);
              console.log(response);
                $http({
                    method: 'POST',
                    url: '/api/users/route',
                    data: user
                })
                .then(function (resp) {
                    $location.path('/commute');
                    return resp.data.token;
                });
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
    };

    return {
        saveRoute: saveRoute
    };
})
.factory('Comm', function ($http) {
    var getCommute = function (user) {
        user.username = 'colin';
        $http({
            method: 'GET',
            url: '/api/users/route'
        })
        .then(function (resp) {
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
             user.duration = resp.data.duration;
             user.arrivalTime = new Date(resp.data.arrivalTime);
             user.departureTime = new Date(user.arrivalTime - (user.duration * 60000));
             user.departureTime = formatTime(user.departureTime);
        });
    };

    return {
        getCommute: getCommute
    };
});










