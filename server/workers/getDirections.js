var cfg = require('../config/googlemaps.js')
var GoogleMapsAPI = require('googlemaps')


var gmAPI = new GoogleMapsAPI(cfg);

var route = {
  origin: '1844 Vine St, Berkeley CA 94703',
  destination: '934 Market St, San Francisco CA',
  mode: 'driving'
}

gmAPI.directions(route, function (err, result) {
  if (err) { 
    console.error(err)
  } else {
    console.log(result)
  }
});