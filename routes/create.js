/*
 * GET home page.
 */
var data = require('../data.json');

exports.view = function (req, res) {
    console.log("create.js: in create page");

    // user cookie validation (bcak to home)

    // get a random code
    var randCode = Math.floor(Math.random()*900000) + 100000;
    while(randCode in data['meeting']) {
        randCode = Math.floor(Math.random()*900000) + 100000;
    }

    // randCode validation with while loop
    
    // generate a room
    var newRoom = {
        "creator": {},
        "user": [],
        "polling": []
    };
    data["meeting"][randCode] = (newRoom);
    
    // update cookie
    req.session.creator = true;
    req.session.code = randCode;
    
    res.render('create', {code: randCode});
};