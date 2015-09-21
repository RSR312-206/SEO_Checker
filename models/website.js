 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

var websiteSchema = new Schema({
  url: String,
  user:  [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

var Website = mongoose.model("Website", websiteSchema );

module.exports = Website;

