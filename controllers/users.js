var db = require('../models/index');
var loginMiddleware = require('../middleware/loginHelper');
var routeMiddleware = require('../middleware/routeHelper');

//TODO
//Add route helpers, fix logout

//signup page

app.get('/users/signup', function(req, res) {
  res.render('users/signup');
});

app.post('/users/signup', routeMiddleware.preventLoginSignup, function(req, res) {
  var newUser = req.body.user;
  console.log(newUser);
  db.User.create(newUser, function(err, user) {
    if (user) {
      req.login(user);
      res.redirect('/websites');
    } else {
      res.redirect('/users/signup');
    }
  });
});

//login page

app.get('/users/login', function(req, res) {
  res.render('users/login');
});

app.post('/users/login', routeMiddleware.preventLoginSignup, function(req, res) {
  db.User.authenticate(req.body.user,
    function(err, user) {
      if(!err && user !== null) {
        req.login(user);
        res.redirect('/websites')
      } else {
        res.redirect('/users/login');
      }
    });
})

//logout
app.get('/users/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

