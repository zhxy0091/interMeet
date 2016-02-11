/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function (req, res) {
    if (req.method == 'DELETE') {
        if (req.session.creator == true) {
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
    } else if (req.method == 'GET') {
        var errorClass = req.session.codeErrorClass;
        var errorPlaceholder = req.session.codeErrorPlaceholder;
        res.render('index', {
            errorClass: errorClass,
            errorPlaceholder: errorPlaceholder,
            firstname: req.session.firstname,
            lastname: req.session.lastname
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