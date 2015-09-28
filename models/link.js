 var db = require('../models/index');
 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var Website = require('./website');

var linkSchema = new Schema({
  ueid: Number,
  urls: Array,
  link: String,
  success: Array,
  fail: Array,
  imgLink: String,
  website: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website"
  }]
});

var siteLink = mongoose.model("siteLink", linkSchema);

module.exports = siteLink;