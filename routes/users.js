var express = require('express');
var router = express.Router();
var connect_server = require('../Service/connect');

/* GET users listing. */
router.get('/add', function(req, res, next) {
    res.render('users/add', { layout: null });
});
router.get('/repassword', function(req, res, next) {
    res.render('users/repassword', { layout: null });
});

//所有的管理员信息
router.get('/read', function(req, res, next) {

    connect_server.connect_server('GET', req.originalUrl, req.query, function(data) {
        console.log(data);
        res.json(data);
    });

});

//保存管理员信息进数据库
router.post('/save', function(req, res, next) {

    connect_server.connect_server('POST', req.originalUrl, req.body, function(data) {
        console.log(data);
        res.json(data);
    });

});

//密码重置
router.post('/reset', function(req, res, next) {

    connect_server.connect_server('POST', req.originalUrl, req.body, function(data) {
        console.log(data);
        res.json(data);
    });

});

//删除某个管理员信息
router.get('/delete', function(req, res, next) {

    connect_server.connect_server('GET', req.originalUrl, req.query, function(data) {
        console.log(data);
        res.json(data);
    });

});


module.exports = router;