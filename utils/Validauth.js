module.exports = function(req, res, next) {


    var signed = req.session && req.session.signed;
    var username = req.session && req.session.username;


    if (req.url === '/' || req.url === '/login' || req.url.indexOf('/login') > -1 || req.url.indexOf('/api') > -1 || req.url.indexOf('/javascripts/') > -1 || req.url.indexOf('/js/') > -1 || req.url.indexOf('/stylesheets/') > -1 || req.url.indexOf('/css/') > -1 || req.url.indexOf('/images/') > -1 || req.url.indexOf('/fonts/') > -1 || req.url.indexOf('/files') > -1 || req.url.indexOf('/uploadimg') > -1 || req.url.indexOf('/printOrder') > -1 || req.url.indexOf('/favicon') > -1) {
        next();
    } else {

        if (signed && username) {
            next();
        } else {

            res.redirect('/login');

        }
    }
};