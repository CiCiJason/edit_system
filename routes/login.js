var express = require('express');
var router = express.Router();
var connect_server = require('../Service/connect');

//加载layout和ui-view
router.get('/', function(req, res, next) {
    res.render('main');
});


router.get('/login', function(req, res, next) {
    res.render('login', { layout: null });
});
router.get('/input', function(req, res, next) {

    res.render('document/input', { layout: null });
});
router.get('/modify', function(req, res, next) {
    res.render('document/modify', { layout: null });
});
router.get('/type', function(req, res, next) {
    res.render('document/type', { layout: null });
});
router.get('/view',function(req,res,next){
    res.render('document/view', { layout: null });
});

//退出系统
router.get('/logout', function(req, res) {

    // req.session.destroy();
    req.session._id='';
    req.session.accountname='';
    req.session.logined='';
    console.log(req.session);
    res.render('logout', { layout: null });
});

//保存文档
router.post('/save', function(req, res, next) {

    connect_server.connect_server('POST', req.originalUrl, req.body, function(data) {
        console.log(data);
        res.json(data);
    });
});

router.post('/login/verify', function(req, res, next) {
    connect_server.connect_server('POST', req.originalUrl, req.body, function(data) {
        if (data.error) {
            res.json({ 'error': data.error });
        } else {

            if (data.code == 200) {
                req.session.signed = 'true';
                req.session.username = data.username;
                req.session.admin = data.auth;
            }
            res.json(data);
        }
    });
});


module.exports = router;