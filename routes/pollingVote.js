var data = require('../data.json');
var util = require('util');

exports.view = function(req, res){
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    var pollingId = req.params.id;
	console.log(pollingId);
    console.log(req.session);
	var thisPolling;
	console.log(data['meeting'][code]['polling']);
	for (var i = 0; i < data['meeting'][code]['polling'].length; i++) {
		console.log(data['meeting'][code]['polling'][i]);
		if (data['meeting'][code]['polling'][i]['id'] == pollingId) {
			thisPolling = data['meeting'][code]['polling'][i];
			break;
		}
	}
	console.log(thisPolling);
    console.log(util.inspect(data, {showHidden: false, depth: null}));
    console.log(util.inspect(data, {showHidden: false, depth: null}));
    var passIn = data['meeting'][code];
    passIn['thisSession'] = {
            'code': code,
            'firstname': firstname,
            'lastname': lastname
        };
	passIn['thisPolling'] = thisPolling;
  	res.render('pollingVote', passIn );
};
