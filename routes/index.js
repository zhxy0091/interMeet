/*
 * GET home page.
 */

exports.view = function (req, res) {
    console.log("in index page");
    if (req.method == 'DELETE') {
        console.log("in index page, delete detected");
        req.session.destroy();
    }
    res.render('index');
};