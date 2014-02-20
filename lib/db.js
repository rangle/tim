var mongoose = require('mongoose')
    , logger = require('winston');

var mongoURL= 'mongodb://127.0.0.1/tim2';
mongoose.connect(mongoURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  logger.info("mongoose connection is open");
});

// WARNING: the db connection doesn't exist yet- if you want to access the datbase, do so in the 'open' callback above.

// we are defined the xxx_id fields as Numbers so Mongoose automatically coerices strings to numbers
var UserModel = mongoose.model('User', new mongoose.Schema({user_id : {type: Number }}, {strict: false}));
var ProjectModel = mongoose.model('Project', new mongoose.Schema({project_id : {type: Number }}, {strict: false}));
var TaskModel = mongoose.model('Task', new mongoose.Schema({task_id : {type: Number }}, {strict: false}));
// var TaskModel = mongoose.model('Task', new mongoose.Schema({}, {strict: false}));