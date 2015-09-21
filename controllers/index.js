var loginMiddleware = require('../middleware/loginHelper');
var routeMiddleware = require('../middleware/routeHelper');

require('./users');
require('./websites')
//require the rest of the controllers


app.get('*', function(req, res){
  res.render('404');
});
