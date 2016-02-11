var data = require('../data.json');
var util = require('util');

exports.view = function(req, res){
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    console.log(req.session);

    console.log(util.inspect(data, {showHidden: false, depth: null}));
    data['meeting'][code]['user'].push({
        'lastname': lastname,
        'firstname': firstname
    });
    console.log(util.inspect(data, {showHidden: false, depth: null}));
    var passIn = data['meeting'][code];
    passIn['thisSession'] = {
            'code': code,
            'lastname': lastname,
            'firstname': firstname
        };
  	res.render('newPolling', passIn );
};