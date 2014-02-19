
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
require('./lib/db');
var mongoose= require('mongoose');
var logger = require('winston');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

app.use(express.static(path.join(__dirname, 'app')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/tasks', function(req, res){
  var Task= mongoose.model('Task');
  Task.find({}, function(err, data){
      res.send(data);      
  });
});

app.get('/tasks/:id', function(req, res){
  var Task= mongoose.model('Task');

  var id = req.params.id;
  Task.findOne({'task_id': id}, function(err, data){
    if(err){
      logger.error(module + " get err=" + err);
      res.send(err);
    }else{
      res.send(data);      
    }
  });
}
);

app.post('/tasks', function(req, res){
  var Task= mongoose.model('Task');
  var task= new Task(req.body);
  task.save();
}
);

// update
app.put('/tasks/:id', function(req, res){
  var Task= mongoose.model('Task');
  console.log("task PUT called");
  var id = req.params.id;
  Task.findByIdAndUpdate(id, req.body);

});

// delete
app.del('/tasks/:id', function(req, res){
  var Task= mongoose.model('Task');
  var id = req.params.id;
  console.log(req.params);
  
  Task.findOneAndRemove({task_id: id}, function(err){
    if(err){
      console.log(err);  
    }else{
      console.log("findAndRemove completed");
    }
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
