/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function (req, res) {
    console.log("in index page");
    if (req.method == 'DELETE')  {
        console.log("in index page, delete detected");
        if (req.session.creator == true) {
            delete data['meeting'][req.session.code]
            console.log("room"+req.session.code+"was deleted");
            console.log(data['meeting']);
        } else {
            var thisUser = {
                "firstname": req.session.firstname,
                "lastname": req.session.lastname
            }
            if((req.session.code in data['meeting'])) {
                var userList = data['meeting'][req.session.code]['user'];
                for (var i = 0; i < userList.length; i++) {
                    if(thisUser == userList[i]) {
                        delete userList[i];
                        break;
                    }
                }
                console.log(userList);
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
        }
    }   
};