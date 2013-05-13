var redis = require('../redis');

var redisCli = redis.redisCli;

/*
 * GET home page.
 */

exports.index = function(req, res){
  // Month is indexed from 0 but we want the human-readable version
  var month = (new Date()).getMonth() + 1;
  res.redirect('/months/'+month);
};

exports.month = function(req, res) {
  res.render('index', { month: req.params.month });
};

exports.add = function(req, res) {
  var key = req.body.month + ':' + req.body.user;
  var day = req.body.day;
  redisCli.sadd( key, String(day), redis.print);
  res.redirect('/');
}
