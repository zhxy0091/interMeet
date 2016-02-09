
exports.view = function(req, res){
	var code = req.params.code;
  	res.render('home', code);
};
