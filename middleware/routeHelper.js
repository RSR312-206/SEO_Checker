var db = require('../models');

var routeHelpers = {
  ensureLoggedIn: function(req, res, next) {
    if(req.session.id !== null && req.session.id !== undefined) {
      return next();
    } else {
      res.redirect('/users/login');
    }
  },

  // ensureCorrectUser: function(req, res, next) {

  // }

  preventLoginSignup: function(req, res, next) {
    if(req.session.id !== null && req.session.id !== undefined) {
      res.render('websites/index');
    } else {
      return next();
    }
  }
};

module.exports = routeHelpers;