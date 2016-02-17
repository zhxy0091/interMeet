var data = require('../data.json');
var util = require('util');

exports.view = function (req, res) {
    if (req.method == 'GET') {
        var firstname = req.session.firstname;
        var lastname = req.session.lastname;
        var code = req.session.code;
        var join = req.session.join;
        console.log('get');
        if (code == undefined) {
            return res.redirect('/');
        }
    } 
    else if (req.method == 'POST') {
        var join = false;
        if(req.session.code == undefined) {
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
        if(!(code in meeting)) {
            console.log('code is not valid');
            req.session.error = 'Invalid Code';
            req.session.codeErrorClass = ' has-error';
            req.session.codeErrorPlaceholder = 'Invalid code';
            req.session.codeErrorColor = 'background: #faebd7';
            return res.redirect('/');
        }
        if(!join) {
        data['meeting'][code]['creator'] = 
        {   'firstname': firstname,
            'lastname': lastname
        };
        }

        console.log('post');
    

    console.log(util.inspect(data, {
        showHidden: false,
        depth: null
    }));

    
    
    console.log("home.js"+data['meeting'][code]['creator']);
    
    data['meeting'][code]['user'].push({
        'firstname': firstname,
        'lastname': lastname
    });
    }
    else if (req.method == 'DELETE') {
        var firstname = req.session.firstname;
        var lastname = req.session.lastname;
        var code = req.session.code;
        var join = req.session.join;
        id = req.body.id;
        console.log("id is " + id);
        data['meeting'][code]['polling'].splice(id,1);
        //TODO use socket io to refresh data
    }


    
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
    // handlebar data pass in
    res.render('home', passIn);
};