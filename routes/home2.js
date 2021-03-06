var data = require('../data.json');
var util = require('util');

exports.view = function (req, res) {
    if (req.method == 'GET') {
        var roomError = req.session.roomError;
        delete req.session.roomError;
        var firstname = req.session.firstname;
        var lastname = req.session.lastname;
        var code = req.session.code;
        var join = req.session.join;
        console.log('get');
        if (code == undefined) {
            return res.redirect('/');
        }
    }
    var passIn = data['meeting'][code];
    for(var i=0; i<data['meeting'][code]['polling'].length; i++) {
        var numParticipant = data['meeting'][code]['polling'][i]['participant'].length;
        var numPeople = data['meeting'][code]['user'].length;
        var progress = numParticipant*100/numPeople;
        data['meeting'][code]['polling'][i]['progress'] = progress;
        data['meeting'][code]['polling'][i]['numParticipant'] = numParticipant;
        data['meeting'][code]['polling'][i]['numPeople'] = numPeople;
    }
    passIn['thisSession'] = {
        'code': code,
        'firstname': firstname,
        'lastname': lastname,
        'join': join,
        'roomError': roomError,
    };
    // no repeat polling: add boolean "voted"
    for (var i = 0; i < passIn["polling"].length; i++) {
		passIn["polling"][i]['noVoting'] = false;
		passIn["polling"][i]["voted"] = false;
        for (var j = 0; j < passIn["polling"][i]["participant"].length; j++) {
            if (firstname == passIn["polling"][i]['participant'][j]['firstname'] &&
                lastname == passIn["polling"][i]['participant'][j]['lastname']) {
                // console.log("pollingVote.js: " + "the current user has voted before.");
                passIn["polling"][i]["voted"] = true;
				passIn["polling"][i]['noVoting'] = true;					
            }
		}
        if (passIn["polling"][i]['active'] == false)
            passIn["polling"][i]['noVoting'] = true;
    }
  
    if (passIn['polling'].length > 0)
      passIn['ifPolling'] = true;
    else
      passIn['ifPolling'] = false;
    console.log(passIn['ifPolling'])
    console.log(passIn);
    // handlebar data pass in
    res.render('home2', passIn);
};