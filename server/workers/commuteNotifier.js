var User = require('../users/userModel.js');
var Q = require('q');
var cfg = require('../config/twilioConfig.js');
var client = require('twilio')(cfg.accountSid,cfg.authToken);
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commutely');

var findUsers = Q.nbind(User.find, User);

var notifyUser = function (message, req, res, next) {
  client.sendMessage(message, function(err, responseData) {
    if (!err) { 
        console.log(responseData.from);
        console.log(responseData.body);
    } else {
        console.error(err);
    }
  });
};

findUsers({}).then(function(users){
  users.forEach(function(user) {
    var message = {
          to: '+12022585536',
          from: cfg.sendingNumber,
          body: 'Morning ' + user.username + '! Leave by 8:00 AM to arrive on time.'
    };
    notifyUser(message);
  })
}).done();



