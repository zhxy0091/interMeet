var data = require('../data.json');
var util = require('util');

exports.view = function(req, res){
	if (req.method == 'GET'){
		var firstname = req.session.firstname;
		var lastname = req.session.lastname;
		var code = req.session.code;
		console.log('get');
		console.log(req.session.firstname);
		console.log(req.session.code);
	}
	else {
		var code = req.body.meeting.code;
		var firstname = req.body.user.firstname;
		var lastname = req.body.user.lastname;
		req.session.firstname = firstname;
		req.session.lastname = lastname;
		req.session.code = code;
		console.log('post');
		console.log(req.session.firstname);
		console.log(req.session.code);
	}
    var joinInfo = {
        'code': code,
        'lastname': lastname,
        'firstname': firstname
    }


    console.log(util.inspect(data, {showHidden: false, depth: null}));
    data['meeting'][code]['user'].push({
        'lastname': lastname,
        'firstname': firstname
    });
    console.log(util.inspect(data, {showHidden: false, depth: null}));
  	res.render('home', joinInfo);
};