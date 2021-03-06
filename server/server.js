var express = require('express');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named "commutely"
mongoose.connect('mongodb://localhost/commutely');

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

var port = process.env.PORT || 8000;

// start listening to requests on port 8000
app.listen(port);

console.log('Server listening at ', port);

// export our app for testing and flexibility, required by index.js
module.exports = app;
