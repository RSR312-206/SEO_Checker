var db = require('../models');

var routeHelpers = {
  ensureLoggedIn: function(req, res, next) {
    if(req.session.id !== null && req.session.id !== undefined) {
      return next();
    } else {
      res.redirect('/users/login');
    }
  },

   ensureCorrectUser: function(req, res, next) {
    db.Website.findById(req.params.id, function(err, website) {
      if(website.user !==  req.session.id) {
        res.redirect('/websites');
      } else {
        return next();
      }
    });
  },

  preventLoginSignup: function(req, res, next) {
    if(req.session.id !== null && req.session.id !== undefined) {
      res.render('websites/index');
    } else {
      return next();
    }
  }
};

module.exports = routeHelpers;