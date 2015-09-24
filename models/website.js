 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var User = require('./user');
 var Link = require('./link');

var websiteSchema = new Schema({
  url: String,
  keyword: String,
  user:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  link: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "siteLink"
  }]
});

//refactor: add api call as a hook

var Website = mongoose.model("Website", websiteSchema );

module.exports = Website;

