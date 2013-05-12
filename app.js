
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , redis = require('redis');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var redisCli = redis.createClient();

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Application routes: they produce HTML
app.get('/', routes.index);
app.get('/months/:month', routes.month);

// API routes (they return JSON data)
app.get('/days/:month', function(req, res) {
  redisCli.keys(req.params.month+':*', function(err, val) {
    res.send(val);
  });
});
app.get('/days/:month/:userid', function(req, res) {
  redisCli.lrange(req.params.month + ':' + req.params.userid, 0, -1, function(err, val) {
    res.send(val);
  });
});
app.get('/users/:userid', function(req, res) {
  redisCli.hgetall(req.params.userid, function(err, val) {
    res.send(val);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
