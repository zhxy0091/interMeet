var data = require('../data.json');
var util = require('util');

exports.view = function (req, res) {
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    var join = req.session.join;
    console.log(req.session);

    console.log(util.inspect(data, {
        showHidden: false,
        depth: null
    }));

    console.log(util.inspect(data, {
        showHidden: false,
        depth: null
    }));
    var passIn = data['meeting'][code];
    passIn['thisSession'] = {
        'code': code,
        'firstname': firstname,
        'lastname': lastname,
        'join': join
    };
    res.render('newPolling', passIn);
};