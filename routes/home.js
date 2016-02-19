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
    } else if (req.method == 'POST') {
        if (req.session.join == true) {
            //user already join a room but did not leave the room
            //should print out alert
            req.session.roomError = true;
            return res.redirect('/home');
        }
        var roomError = req.session.roomError;
        delete req.session.roomError;

        var join = false;
        if (req.session.code == undefined) {
            req.session.code = req.body.meeting.code;
            join = true;
        }
        var firstname = req.body.user.firstname;
        var lastname = req.body.user.lastname;
        req.session.firstname = firstname;
        req.session.lastname = lastname;
        req.session.join = join;

        var code = req.session.code;

        //log if user join or create
        //req.session.operation = "join";

        //check if code is valid
        var meeting = data['meeting'];
        if (!(code in meeting)) {
            console.log('code is not valid');
            req.session.error = 'Invalid Code';
            req.session.codeErrorClass = ' has-error';
            req.session.codeErrorPlaceholder = 'Invalid code';
            req.session.codeErrorColor = 'background: #faebd7';
            return res.redirect('/');
        }
        if (!join) {
            data['meeting'][code]['creator'] = {
                'firstname': firstname,
                'lastname': lastname
            };
            data['meeting'][code]['user'].push({
                'firstname': firstname,
                'lastname': lastname
            });
        } else {
            data['meeting'][code]['user'].push({
                'firstname': firstname,
                'lastname': lastname
            });
        }
    } else if (req.method == 'DELETE') {
        var firstname = req.session.firstname;
        var lastname = req.session.lastname;
        var code = req.session.code;
        var join = req.session.join;
        id = req.body.id;
        console.log("id is " + id);
        if(!join) {
            data['meeting'][code]['polling'][id]['deleted'] = true;
        }
        //TODO use socket io to refresh data
    }
    var passIn = data['meeting'][code];
    for(var i=0; i<data['meeting'][code]['polling'].length; i++) {
        var numParticipant = data['meeting'][code]['polling'][i]['participant'].length;
        var numPeople = data['meeting'][code]['user'].length;
        var progress = numParticipant*100/numPeople;
        data['meeting'][code]['polling'][i]['progress'] = progress;
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
    console.log(passIn);
    // handlebar data pass in
    res.render('home', passIn);
};