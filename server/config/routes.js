var helpers = require('./helpers.js');

module.exports = function(app, express) {
  // app.post('/api/users/login', userController.login);
  // app.post('/api/users/signup', userController.signup);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};