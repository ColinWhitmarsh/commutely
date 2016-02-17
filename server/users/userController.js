var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var client = require('twilio')('AC088d01f4797b49e536690c7e11651a0f', '71e571fb68bc7bbd3ee7faa7d62da016');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

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

module.exports = {
  login: function (req, res, next) {
    console.log('req.body', req.body);
    var username = req.body.username;
    var password = req.body.password;

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'supersecret');
                res.json({token: token});
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    findUser({username: username})
      .then(function (user) {
        if (user) {
          next(new Error('User already exists'));
        } else {
          console.log('Attempting to create user');
          return createUser({
            username: username,
            password: password
          });
        }
      })
      .then(function (user) {
        console.log('User created!');
        var token = jwt.encode(user, 'supersecret');
        res.json({token: token});
      })
      .fail(function (error){
        next(error);
      });
  },

  saveRoute: function (req, res, next) {
    var username = req.body.username;
    var origin = req.body.origin;
    var destination = req.body.destination;
    var duration = req.body.duration;
    var arrivalTime = req.body.arrivalTime;
    var travelMode = req.body.travelMode;

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          user.origin = origin;
          user.destination = destination;
          user.duration = duration;
          user.arrivalTime = arrivalTime;
          user.travelMode = travelMode;
          user.save(function(err) {
            if (err) {
              return next(new Error('Couldn\'t update user'));
            } else {
              console.log(user)
              res.send(user);
            }
          });
        }
      })
      .fail(function (error) {
        next(error);
      });

  },

  getRoute: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'supersecret');
      findUser({username: user.username})
        .then(function (user) {
          if (!user) {
            next(new Error('User does not exist'));
          } else {
            var message = {
              to: '+12022585536',
              from: '+12025176941',
              body: 'Leave by 8:00 AM to arrive on time'
            };
            notifyUser(message);
            res.send(user);
          }
      })
      .fail(function (error) {
        next(error);
      });
    }
  },

  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'supersecret');
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  }
};