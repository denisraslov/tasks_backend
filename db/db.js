var mongoose = require('mongoose');

function init(config) {
    mongoose.connect(config.get('db:host'), config.get('db:name'));
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error:'));
    db.once('open', function() {
      console.log('Connected to DB');
    });
    mongoose.Error.messages.general.required = 'Field "{PATH}" id required.';
}

module.exports = {
    init: init
}
