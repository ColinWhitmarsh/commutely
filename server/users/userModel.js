var Q = require('q');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  origin: {
    type: String,
    required: false
  },

  destination: {
    type: String,
    required: false
  },

  duration: {
    type: String,
    required: false
  },

  arrivalTime: {
    type: String,
    required: false
  }
});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;

  return Q.Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('users', UserSchema);