var data = require('../data.json');
var util = require('util');

exports.view = function(req, res){
	var code = req.body.meeting.code;
    var firstname = req.body.user.firstname;
    var lastname = req.body.user.lastname;
   
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