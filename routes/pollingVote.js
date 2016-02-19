var data = require('../data.json');
var util = require('util');

exports.view = function (req, res) {
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    var join = req.session.join;
    var pollingId = req.params.id;
    var thisPolling;
    for (var i = 0; i < data['meeting'][code]['polling'].length; i++) {
        console.log(data['meeting'][code]['polling'][i]);
        if (data['meeting'][code]['polling'][i]['id'] == pollingId) {
            thisPolling = data['meeting'][code]['polling'][i];
            break;
        }
    }
    
    if (thisPolling['active'] == false) {
		return res.redirect('/polling/' + pollingId);
	}
    
    // no repeat voting
    for (var i = 0; i < thisPolling['participant'].length; i++) {
        if (firstname == thisPolling['participant'][i]['firstname'] && lastname == thisPolling['participant'][i]['lastname']) {
            // console.log("pollingVote.js: " + "the current user has voted before.");
            return res.redirect('/polling/' + pollingId);
        }
    }

    var passIn = data['meeting'][code];
    passIn['thisSession'] = {
        'code': code,
        'firstname': firstname,
        'lastname': lastname,
        'join': join
    };
    passIn['thisPolling'] = thisPolling;
    res.render('pollingVote', passIn);
};

exports.vote = function(req, res) {
var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    var join = req.session.join;
    var pollingVote = req.body.options;
	var pollingId = req.params.id;
	data['meeting'][code]['polling'][req.params.id]['result'][pollingVote]++;
    var thisUser = {'firstname':firstname, 'lastname':lastname};
    data['meeting'][code]['polling'][req.params.id]['participant'].push(thisUser);
    var thisPolling;
	for (var i = 0; i < data['meeting'][code]['polling'].length; i++) {
		if (data['meeting'][code]['polling'][i]['id'] == pollingId) {
			thisPolling = data['meeting'][code]['polling'][i];
			break;
		}
	}
    return res.redirect('/polling/' + pollingId);
}