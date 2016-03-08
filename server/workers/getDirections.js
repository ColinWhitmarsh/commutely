var cfg = require('../config/googlemaps.js')
var GoogleMapsAPI = require('googlemaps')

var gmAPI = new GoogleMapsAPI(cfg);

module.exports.getDirections = function (route) {
  gmAPI.directions(route, function (err, result) {
    if (err) { 
      console.error(err)
    } else {
      console.log(result)
    }
  });
}

// Example Route
// var route = {
//   origin: '75 9th Ave, New York, NY',
//   destination: 'MetLife Stadium Dr East Rutherford, NJ 07073',
//   mode: 'driving'
// }