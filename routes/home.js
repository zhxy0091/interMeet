
exports.view = function(req, res){
	var code = req.query.code;
  	res.render('home', {
        'code': code
    });
};
