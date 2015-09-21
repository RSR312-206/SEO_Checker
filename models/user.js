var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;


var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  websites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website"
  }]
});

var User = mongoose.model("User", userSchema);


userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrpt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
        });
    });
});

userSchema.statics.authenticate = function(formData, callback) {
  this.findOne({
    username: formData.username
  },
  function (err, user) {
    if (user === null) {
      callback('invalid username', null);
    } else {
      user.checkPassword(formData.password, callback);
    }
  });
};


module.exports = User;