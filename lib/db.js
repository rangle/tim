var mongoose = require('mongoose')
    , logger = require('winston');

var mongoURL= 'mongodb://127.0.0.1/tim2';
mongoose.connect(mongoURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  logger.info("mongoose connection is open");
});

var UserModel = mongoose.model('User', new mongoose.Schema({user_id : {type: Number }}, {strict: false}));
var ProjectModel = mongoose.model('Project', new mongoose.Schema({}, {strict: false}));
var TaskModel = mongoose.model('Task', new mongoose.Schema({}, {strict: false}));