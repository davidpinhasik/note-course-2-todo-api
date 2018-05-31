const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');
const bcrypt    = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// instance methods

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user   = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  })
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
      return Promise.reject()
      // return new Promise(resolve, reject) => {
      //   reject();
      // })
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  // console.log(`Strting findByCredentials, email: ${email}, password: ${password}`);
  var User = this;
  return User.findOne({email}).then((user) => {
    // console.log('Entering success path of then()');
    if (!user) {
      // console.log('no user found, returning Promise.reject()');
      return Promise.reject()
    };
    // console.log(`user found. about to create new promise for compare: email: ${user.email}, password: ${user.password}`);
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        // console.log('compare was called');
        if (!res) {
          // console.log('compare return false, will call reject()');
          reject();
        };
        // console.log('compare was true, will call resolve(user)');
        resolve(user);
      });
    });

  }).catch((err) => {
      // console.log('error was caught, calling Promise.reject()');
      return Promise.reject()
    });
};

UserSchema.pre('save', function (next) {
var user = this;

if (user.isModified('password')) {
  bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(user.password, salt, (err, hash) => {
    user.password = hash;
    next();
  });
});

} else {
  next();
};


});

var User = mongoose.model('User', UserSchema);

module.exports = {User};


// var newUser = new User({
//   email: 'davidpinhasik@example.com '
// });
//
// newUser.save().then((doc) => {
//   console.log('Saved user: ', JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo', e);
// });
