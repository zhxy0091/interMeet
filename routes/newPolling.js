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

exports.new = function (req, res) {
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    var join = req.session.join;
	var pollingTitle = req.body.pollingTitle;
    var pollingDescription = req.body.pollingDescription;
    var pollingOptions = [];
    var count;
    for (var i=0; i<5; i++) {
      pollingOptions[i] = req.body['pollingOption'+i];
      console.log('option '+i+pollingOptions[i]);
      if (pollingOptions[i] == undefined) {
        count = i+1;
        break;
      }
    }
    if (count == undefined)
      count = 5;
	var pollingId = data['meeting'][code]['polling'].length;
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = mm+'/'+dd+'/'+yyyy;
	var pollingData = {
        'id': pollingId,
		'title': pollingTitle,
		'date': today,
        'active': true,
        'deleted': false,
		'choice': [
		],
		'result':[],
        'participant':[],
        'progress': 0
    };
	for (i=0; i<count; i++)
		if (pollingOptions[i] != undefined){
			pollingData['result'][i] = 0;
			pollingData['choice'].push(pollingOptions[i]);
		}
	if (pollingTitle != undefined) {
    	data['meeting'][code]['polling'].push(pollingData);
	}
	return res.redirect('/polling/' + pollingId);
}