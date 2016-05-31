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

function put(req, res, next) {
    var data = {};

    if(req.body.id && req.body.params){
        req.body.params.completed !== undefined ? data.completed = req.body.params.completed : false;
        req.body.params.title !== undefined ? data.title = req.body.params.title : false;
        req.body.params.description !== undefined ? data.description = req.body.params.description : false;
        if(req.body.params.date !== undefined){
            if(req.body.params.date !== null){
                data.date = new Date(parseInt(req.body.params.date));
            } else {
                data.date = null;
            }
        }

        Task.findByIdAndUpdate(req.body.id, {$set: data}, function(err, task){
            return err ? next(err) : res.json({success: true});
        });
    }
}

module.exports = {
  get: get,
  post: post,
  put: put
};
