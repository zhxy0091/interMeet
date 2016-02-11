/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function (req, res) {
    console.log("in index page");
    if (req.method == 'DELETE')  {
        console.log("in index page, delete detected");
        if (req.session.creator == true) {
            console.log(data['meeting']);
            delete data['meeting'][req.session.code]
            console.log(data['meeting']);
        } else {
            var thisUser = {
                "firstname": req.session.firstname,
                "lastname": req.session.lastname
            }
            if((req.session.code in data['meeting'])) {
                var userList = data['meeting'][req.session.code]['user'];
                for (var i = 0; i < userList.length; i++) {
                    console.log("index.js: i = " + i);
                    if(thisUser['firstname'] == userList[i]['firstname'] && thisUser['lastname'] == userList[i]['lastname']) {
                        delete userList[i];
                        break;
                    }
                }
            }
        }
        req.session.destroy();
        res.send();
    }
    else if (req.method == 'GET') {
        console.log("in index page, get detected");
        var errorMessage = req.session.error;
       
        res.render('index', {error: errorMessage});
        if(errorMessage) {
            delete req.session.error;
            delete req.session.code;
        }

    }   
};