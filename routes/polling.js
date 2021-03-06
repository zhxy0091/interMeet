var data = require('../data.json');
var util = require('util');

exports.view = function(req, res){
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    var join = req.session.join;
    var pollingId = req.params.id;
    var stopPolling = req.body.stopPolling;
    if (req.method == 'DELETE') {
		data['meeting'][code]['polling'][pollingId]['active'] = false;
	}
    var passIn = JSON.parse(JSON.stringify(data['meeting'][code]));
    passIn['thisSession'] = {
            'code': code,
            'firstname': firstname,
            'lastname': lastname,
            'join': join
        };
    var thisPolling = data['meeting'][code]['polling'][pollingId];
    passIn['thisPolling'] = thisPolling;
  	res.render('polling', passIn);
};