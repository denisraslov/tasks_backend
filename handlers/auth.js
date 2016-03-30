var passport = require('passport');

var User = require('./../db/models/user');

function auth(req, res, next) {

    passport.authenticate('local', function (err, user) {

        if (err)
            return next(err);

        if (!user) {
            return res.status(400).json({error: {message: 'Failed auth'}});
        } else {
            return req.logIn(user, function (err) {
                if (err)
                    return next(err);

                return res.json(user);
            });
        }

    })(req, res, next);
}


module.exports = auth;
