var mongoose = require('mongoose')
mongoose.connect( process.env.MONGOLAB_URI || "mongodb://localhost/radiant-plains-5006")

module.exports.siteLink = require('./link');
module.exports.Tag = require('./tag');
module.exports.User = require('./user');
module.exports.Website = require('./website');

