
/*
 * GET home page.
 */

exports.index = function(req, res){
  if(req.params.month) {
    res.render('index', { month: req.params.month });
  } else {
    // Month is indexed from 0 but we want the human-readable version
    var month = (new Date()).getMonth() + 1;
    res.redirect('/months/'+month);
  }
};
