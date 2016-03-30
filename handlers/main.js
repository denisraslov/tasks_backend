var auth = require('./auth');
var signup = require('./signup');
var user = require('./user');
var users = require('./users');
var friendships = require('./friendships');
var friendship = require('./friendship');

module.exports = {
  auth: auth,
  signup: signup,
  user: user,
  users: users,
  friendships: friendships,
  friendship: friendship
};