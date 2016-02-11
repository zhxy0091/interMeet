/*
 * GET home page.
 */

exports.view = function (req, res) {
    console.log("in index page");
    if (req.method == 'DELETE')  {
        console.log("in index page, delete detected");
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