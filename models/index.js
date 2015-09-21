var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/seo_checker");

module.exports.Url = require('./link');
module.exports.Tag = require('./tag');
module.exports.User = require('./user');
module.exports.Website = require('./website');
