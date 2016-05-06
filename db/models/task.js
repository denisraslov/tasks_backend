var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var taskSchema = mongoose.Schema({
    userId: { type: ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true, validate: [ titleValidator, 'Title must not be empty' ] },
    description: { type: String },
    completed: { type: Boolean, required: true }
});

taskSchema.index({ userId: 1 });

function titleValidator(value) {
  return value != '';
}

taskSchema.statics.getForUser = function(userId, callback) {
    var self = this;
    var query = this.find({ userId: userId });

    query.exec(function(err, userTasks) {
        if (err) {
            callback(err);
            return;
        }

        callback(err, userTasks);
    });
};

module.exports = mongoose.model('Task', taskSchema);
