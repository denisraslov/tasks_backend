var passport = require('passport');

var User = require('./../db/models/user');

function registerUser(req, res, next) {

    User.findOne({email: req.body.email}, function (err, user) {

        if (user) {
            res.status(400).json({error: {message: 'The user with this email already exists'}})
        } else {

            var user = new User({
                regDate: new Date(),
                email: req.body.email,
                password: req.body.password
            });

            user.save(function (err) {
                return err ? next(err) : res.json(user);
            });

        }
    });

}

module.exports = registerUser;
