var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./db/models/user');

function init() {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {

        User.findOne({email: email}, function (err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, null);

            if (user.comparePass(password)) {
                return done(null, user);
            } else {
                return done(null, null);
            }
        });
    }));
}

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.status(401).json({error: {message: 'AUTH_REQUIRED'}});
}

module.exports = {
    init: init,
    checkAuth: checkAuth
};
