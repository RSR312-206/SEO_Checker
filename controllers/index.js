var loginMiddleware = require('../middleware/loginHelper');
var routeMiddleware = require('../middleware/routeHelper');

require('./users');
require('./websites');
require('./links');
//require the rest of the controllers

app.get('/', routeMiddleware.preventLoginSignup, function(req, res){
  res.redirect('/users/login');
});

app.get('*', function(req, res){
  res.render('404');
});


