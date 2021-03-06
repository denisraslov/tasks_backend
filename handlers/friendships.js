var Friendship = require('./../db/models/friendship');

function getAll(req, res, next) {
  Friendship.getItemsForUser(
    req.user._id,
    true,
    function(err, friendships) {
      return err ? next(err) : res.json(friendships);
    }
  );
}

module.exports = {
  getAll: getAll
};
