 var db = require('../models/index');
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var Website = require('./website');

var linkSchema = new Schema({
  link: String,
  imgLink: String,
  ueid: Number,
  website: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website"
  }]
});

var siteLink = mongoose.model("siteLink", linkSchema);

module.exports = siteLink;