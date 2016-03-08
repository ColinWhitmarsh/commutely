// var User = require('../users/userModel.js');
// var Q = require('q');
var cfg = require('../config/twilioConfig.js');
var client = require('twilio')(cfg.accountSid,cfg.authToken);
// var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/commutely');

// var findUsers = Q.nbind(User.find, User);

module.exports.textUser = function (message, req, res) {
  client.sendMessage(message, function(err, responseData) {
    if (err) { 
      console.error(err);
    } else {
      console.log(responseData.from);
      console.log(responseData.body);
    }
  });
};

// var message = {
//   to: '+12223334444',
//   from: cfg.sendingNumber,
//   body: 'Morning ' + user.username + '! Leave by 8:00 AM to arrive on time.'
// };



// findUsers({}).then(function(users){
//   users.forEach(function(user) {
//     var message = {
//           to: '+12022585536',
//           from: cfg.sendingNumber,
//           body: 'Morning ' + user.username + '! Leave by 8:00 AM to arrive on time.'
//     };
//     notifyUser(message);
//   })
// }).done();



