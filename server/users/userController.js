var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

var findUser = Q.nbind(User.findOne, User);
var createUser = Q.nbind(User.create, User);

module.exports = {
  login: function (req, res, next) {
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

    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          user.origin = origin;
          user.destination = destination;
          user.duration = duration;
          user.arrivalTime = arrivalTime;
          user.save(function(err) {
            if (err) {
              return next(new Error('Couldn\'t update user'));
            } else {
              res.send(user);
            }
          });
        }
      })
      .fail(function (error) {
        next(error);
      });

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