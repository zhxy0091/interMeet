/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function (req, res) {
    if (req.method == 'DELETE') {
        if (req.session.join == false) {
            delete data['meeting'][req.session.code]
        } else {
            var thisUser = {
                "firstname": req.session.firstname,
                "lastname": req.session.lastname
            };
            if ((req.session.code in data['meeting'])) {
                console.log("index.js: session data:");
                console.log(req.session);
                var userList = data['meeting'][req.session.code]['user'];
                console.log("index.js: before:");
                console.log(userList);

                findAndRemoveFromArray(data['meeting'][req.session.code]['user'], 'firstname', thisUser.firstname, 'lastname', thisUser.lastname);

                console.log("index.js: after:");
                console.log(data['meeting'][req.session.code]['user']);
            }
        }
        req.session.destroy();
        res.send();
        return res.redirect('/');
    } else if (req.method == 'GET') {
        if(req.session.code != undefined && req.session.firstname != undefined && req.session.lastname != undefined) {
             return res.redirect('/home');
        }
        var errorClass = req.session.codeErrorClass;
        var errorPlaceholder = req.session.codeErrorPlaceholder;
        res.render('index', {
            errorClass: errorClass,
            errorPlaceholder: errorPlaceholder,
            firstname: req.session.firstname,
            lastname: req.session.lastname,
            codeBackground: req.session.codeErrorColor
        });
        if (errorClass) {
            delete req.session.error;
            delete req.session.code;
        }
    }
};

function findAndRemoveFromArray(array, property1, value1, property2, value2) {
    array.forEach(function (result, index) {
        if (result[property1] === value1 && result[property2] === value2) {
            //Remove from array
            array.splice(index, 1);
        }
    });
}

exports.joinOrCreateRoom = function (req, res) {
    /*
        if (req.session.join == true) {
            //user already join a room but did not leave the room
            //should print out alert
            req.session.roomError = true;
            return res.redirect('/home');
        }
        var roomError = req.session.roomError;
        delete req.session.roomError;
    */
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
    res.redirect('/home');
}