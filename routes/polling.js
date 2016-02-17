var data = require('../data.json');
var util = require('util');

exports.view = function(req, res){
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    var join = req.session.join;
    var pollingId = req.params.id;
    console.log(req.session);

    console.log(util.inspect(data, {showHidden: false, depth: null}));
    console.log(util.inspect(data, {showHidden: false, depth: null}));
    var passIn = data['meeting'][code];
    passIn['thisSession'] = {
            'code': code,
            'firstname': firstname,
            'lastname': lastname,
            'join': join
        };
    var thisPolling = data['meeting'][code]['polling'][pollingId];
    passIn['thisPolling'] = thisPolling;
  	res.render('polling', passIn );
};

exports.pollingSubmit = function(req, res){
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    var join = req.session.join;
    var pollingVote = req.body.options;
	var pollingId = req.params.id;
	console.log(data['meeting'][code]['polling'][req.params.id]);
	data['meeting'][code]['polling'][req.params.id]['result'][pollingVote]++;
    var thisUser = {'firstname':firstname, 'lastname':lastname};
    data['meeting'][code]['polling'][req.params.id]['participant'].push(thisUser);
    var thisPolling;
	for (var i = 0; i < data['meeting'][code]['polling'].length; i++) {
		console.log(data['meeting'][code]['polling'][i]);
		if (data['meeting'][code]['polling'][i]['id'] == pollingId) {
			thisPolling = data['meeting'][code]['polling'][i];
			break;
		}
	}
	var passIn = data['meeting'][code];
    passIn['thisSession'] = {
            'code': code,
            'lastname': lastname,
            'firstname': firstname,
            'join': join
        };
    passIn['thisPolling'] = thisPolling;
	console.log(util.inspect(data, {
        showHidden: false,
        depth: null
    }));
    console.log('polling.js thisPolling:' + thisPolling);
  	res.render('polling', passIn );
};

exports.create = function(req, res){
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
      if (pollingOptions[i] == undefined) {
        count = i+1;
        break;
      }
    }
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
        'status': 'active',
		'choice': [
		],
		'result':[],
        'participant':[]
    };
	for (i=0; i<count; i++)
		if (pollingOptions[i] != undefined){
			pollingData['result'][i] = 0;
			pollingData['choice'].push(pollingOptions[i]);
		}
	console.log(pollingData);
	if (pollingTitle != undefined) {
    	data['meeting'][code]['polling'].push(pollingData);
	}
    console.log(util.inspect(data, {showHidden: false, depth: null}));
    var passIn = data['meeting'][code];
    passIn['thisSession'] = {
            'code': code,
            'lastname': lastname,
            'firstname': firstname,
            'join': join
        };
	passIn['thisPolling'] = pollingData;
	res.render('polling', passIn );
}