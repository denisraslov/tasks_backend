var Task = require('./../db/models/task');

function get(req, res, next) {
  Task.getForUser(
    req.user._id,
    function(err, tasks) {
      return err ? next(err) : res.json(tasks);
    }
  );
}

module.exports = {
  get: get
};
