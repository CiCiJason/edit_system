module.exports = function (req, res, next) {


    var logined = req.session.logined;
    var accountname = req.session.accountname;


    if (req.url === '/' || req.url === '/login' || req.url.indexOf('/login') > -1 || req.url.indexOf('/photos') > -1 || req.url.indexOf('/javascripts/') > -1 || req.url.indexOf('/js/') > -1 || req.url.indexOf('/stylesheets/') > -1 || req.url.indexOf('/css/') > -1 || req.url.indexOf('/images/') > -1 || req.url.indexOf('/fonts/') > -1 || req.url.indexOf('/files') > -1 || req.url.indexOf('/uploadimg') > -1 || req.url.indexOf('/printOrder') > -1 || req.url.indexOf('/favicon') > -1) {
        next();
    } else {

        if (logined && accountname) {
            next();
        } else {
            res.redirect('/login');
            return;
        }
    }
};