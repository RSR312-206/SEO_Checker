var mongoose = require('mongoose');
 var Schema = mongoose.Schema;
 var Website = require('./website');

 var tagSchema = new Schema({
  metaTitle: String,
  metaDescription: String,
  hTags: String,
  website: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website"
  }]
 });

 var Tag = mongoose.model("Tag", tagSchema);

 module.exports = Tag;