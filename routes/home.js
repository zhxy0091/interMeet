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
    } else if (req.method == 'DELETE') {
        var firstname = req.session.firstname;
        var lastname = req.session.lastname;
        var code = req.session.code;
        var join = req.session.join;
        id = req.body.id;
        console.log("id is " + id);
        if (!join) {
            data['meeting'][code]['polling'][id]['deleted'] = true;
        }
        //TODO use socket io to refresh data
    }
    
    for (var i = 0; i < data['meeting'][code]['polling'].length; i++) {
        var numParticipant = data['meeting'][code]['polling'][i]['participant'].length;
        var numPeople = data['meeting'][code]['user'].length;
        var progress = numParticipant * 100 / numPeople;
        data['meeting'][code]['polling'][i]['progress'] = progress;
    }
    
    // var passIn = data['meeting'][code];
    var passIn = JSON.parse(JSON.stringify(data['meeting'][code]));
    console.log(JSON.stringify(passIn));
    /* no data modification to the JSON file from here */
    
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
    
//    // sort the polling list
//    console.log("newPolling.js: before");
//    console.log(data['meeting'][code]['polling']);
    passIn["polling"].sort(function(a, b) {
        // a is active but b is not
        if (a['active'] && !b['active'])
            return -1;
        // a is inactive, b is active
        else if (!a['active'] && b['active'])
            return 1;
        else {
            if (a['id'] < b['id']) return 1;
            else if (a['id'] > b['id']) return -1;
            else return 0;
        }
    });
//    console.log("newPolling.js: after");
//    console.log(data['meeting'][code]['polling']);
    
    // handlebar data pass in
    res.render('home', passIn);
};