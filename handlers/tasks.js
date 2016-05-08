var Task = require('./../db/models/task');

function get(req, res, next) {
  Task.getForUser(
    req.user._id,
    function(err, tasks) {
      return err ? next(err) : res.json(tasks);
    }
  );
}

function post(req, res, next) {
    var data = {},
        task;

    data.title = req.body.title;
    data.completed = false;
    data.userId = req.user._id;

    task = new Task(data);

    task.save(function(err) {
      return err ? next(err) : res.json(task);
    });
}

module.exports = {
  get: get,
  post: post
};
