var db = require('../models/index');
var loginMiddleware = require('../middleware/loginHelper');
var routeMiddleware = require('../middleware/routeHelper');
var request = require('request');
var CryptoJS = require("crypto-js");
var SHA1 = require("crypto-js/sha1");

app.get('/websites/:website_id/links', function(req, res) {
  db.Website.findById(req.params.website_id).exec(function(err, website) {
    res.render('links/index');
  });
});

