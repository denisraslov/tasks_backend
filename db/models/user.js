var mongoose = require('mongoose');

var emailValidationErrorText = 'Email must be 4-8 long alphanumeric string and start with letter';
var passValidationErrorText = 'Password must be 6-12 long alphanumeric string and contain at least one number and letter';

// TODO: add validation
var userSchema = mongoose.Schema({
  regDate: { type: Date, required: true },
  email: { type: String, required: true, unique: true, validate: [ emailValidator, emailValidationErrorText ] },
  password: { type: String, required: true, validate: [ passValidator, passValidationErrorText ] }
});

//userSchema.index({ name: 'text', lastname: 'text' });

/*
// сохраняем не пароль, а его хеш
userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('pass'))
    return next();

  bcrypt.genSalt(function(err, salt) {
    if (err)
      return next(err);

    bcrypt.hash(user.pass, salt, function(err, hash) {
      if (err)
        return next(err);

      user.pass = hash;
      next();
    });
  });
});
*/

userSchema.methods.comparePass = function(enteredPassword, cb) {
  return this.password == enteredPassword;
};

module.exports = mongoose.model('User', userSchema);

function emailValidator(value) {
  return value != '';
}

function passValidator(value) {
  return value != '';
}
