var helpers = require('./helpers.js');
var userController = require('../users/userController.js');

module.exports = function (app, express) {
  app.post('/api/users/login', userController.login);
  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/route', userController.saveRoute);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};