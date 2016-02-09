
exports.view = function(req, res){
	var code = req.body.meeting.code;
    console.log(code);
  	res.render('home', {
        'code': code
    });
};
