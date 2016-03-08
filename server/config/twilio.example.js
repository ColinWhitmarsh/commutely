/*
1. Create a copy of this file and name 'twilio.js'. It will not be tracked by git.
2. Add TwilioID, Token, and sending number
3. Save file
*/


var cfg = {};

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID || ''; // Fill me in
cfg.authToken = process.env.TWILIO_AUTH_TOKEN || ''; // Fill me in
cfg.sendingNumber = process.env.TWILIO_NUMBER || ''; // Fill me in

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;