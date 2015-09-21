var db = require('../models');

var loginHelpers = function(req, res, next) {
  req.login = function(user) {
    req.session.id = user.id;
  };
  req.logout = function(user) {
    req.session.id = null;
  };
  next();
};

module.exports = loginHelpers;