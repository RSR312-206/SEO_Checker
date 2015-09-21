 var mongoose = require('mongoose');
 var Schema = mongoose.Schema

var linkSchema = new Schema({
  link: String,
  imgLink: String,
  backlink: String,
  website: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website"
  }]
});

var Link = mongoose.model("Link", linkSchema);

module.exports = Link;