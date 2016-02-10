var data = require('../data.json');
var util = require('util');

exports.view = function (req, res) {
    if (req.method == 'GET') {
        var firstname = req.session.firstname;
        var lastname = req.session.lastname;
        var code = req.session.code;
        console.log('get');
        if (code == undefined) {
            return res.redirect('/');
        }
    } else {
        var code = req.body.meeting.code;
        var firstname = req.body.user.firstname;
        var lastname = req.body.user.lastname;
        req.session.firstname = firstname;
        req.session.lastname = lastname;
        req.session.code = code;
        console.log('post');
        console.log(req.session);
       	req.assert(firstname, 'Firstname is required').notEmpty();
       	req.assert(lastname, 'Lastname is required').notEmpty();

       	var errors = req.validationErrors();
       	if(errors) {
       		res.send(errors);
       		return;
       	}
    }

    console.log(util.inspect(data, {
        showHidden: false,
        depth: null
    }));
    data['meeting'][code]['user'].push({
        'lastname': lastname,
        'firstname': firstname
    });
    console.log(util.inspect(data, {
        showHidden: false,
        depth: null
    }));

    var passIn = data['meeting'][code];
    passIn['thisSession'] = {
        'code': code,
        'lastname': lastname,
        'firstname': firstname
    };
    // handlebar data pass in
    res.render('home', passIn);
};