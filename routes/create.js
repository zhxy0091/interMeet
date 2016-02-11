/*
 * GET home page.
 */

exports.view = function (req, res) {
    console.log("in create page");
    res.render('/create');
};