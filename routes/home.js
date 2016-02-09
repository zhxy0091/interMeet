
exports.view = function(req, res){
	var code = req.body.meeting.code;
    var firstname = req.body.user.firstname;
    var lastname = req.body.user.lastname;
    var joinInfo = {
        'code': code,
        'lastname': lastname,
        'firstname': firstname
    }
  	res.render('home', joinInfo);
};
