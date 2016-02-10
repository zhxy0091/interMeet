/*
 * GET home page.
 */

exports.view = function(req, res){
  if(req.method == 'DELETE') {
  	req.session.destory();
  }
  res.render('index');
};

