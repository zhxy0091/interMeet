/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function (req, res) {
    console.log("in index page");
    if (req.method == 'DELETE')  {
        console.log("in index page, delete detected");
        if (req.session.creator == "true") {
            delete data['meeting'][req.session.code]
            console.log("room"+req.session.code+"was deleted");
        } else {
            var thisUser = {
                "firstname": req.session.firstname,
                "lastname": req.session.lastname;
            }
            if((code in data['meeting'])) {
                var userList = data['meeting'][req.session.code]['user'];
                for (var i = 0; i < userList.length; i++) {
                    if(thisUser == userList[i]) {
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
        console.log("error detected: " + errorMessage);
        res.render('index', {error: errorMessage});
        if(errorMessage) {
            delete req.session.error;
        }
    }
};