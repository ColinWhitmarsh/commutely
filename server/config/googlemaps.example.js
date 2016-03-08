/*
1. Create a copy of this file and name 'googlemaps.js'. It will not be tracked by git.
2. Add Google Maps API key
3. Save file
*/


var cfg = {
  key: process.env.GOOGLE_MAPS_KEY || '', // Fill me in
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true, // use https
};

var requiredConfig = [cfg.key];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'GOOGLE_MAPS_KEY must be set.';
  throw new Error(errorMessage);
}


// Export configuration object
module.exports = cfg;