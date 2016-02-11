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
  	res.render('polling', passIn );
};

exports.create = function(req, res){
    var firstname = req.session.firstname;
    var lastname = req.session.lastname;
    var code = req.session.code;
    console.log(req.session);
    var pollingVote = req.body.options;
	console.log("Vote: " + pollingVote);
  	
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
	console.log(pollingOptions);
	
    console.log(util.inspect(data, {showHidden: false, depth: null}));
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
		'choice': [
		]
    };
	for (i=0; i<count; i++)
		if (pollingOptions[i] != undefined)
			pollingData['choice'].push(pollingOptions[i]);
	console.log(pollingData);
	if (pollingTitle != undefined) {
    	data['meeting'][code]['polling'].push(pollingData);
	}
    console.log(util.inspect(data, {showHidden: false, depth: null}));
    var passIn = data['meeting'][code];
    passIn['thisSession'] = {
            'code': code,
            'lastname': lastname,
            'firstname': firstname
        };
  	res.render('polling', passIn );
};