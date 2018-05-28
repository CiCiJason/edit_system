var express = require('express');
var router = express.Router();

var connect_server = require('../Service/connect');


//保存文档
router.post('/save', function(req, res, next) {

    connect_server.connect_server('POST', req.originalUrl, req.body, function(data) {
        console.log(data);
        res.json(data);
    });
});


//提取文档
router.get('/read', function(req, res, next) {
    var index = req.originalUrl.indexOf('?');
    if (index >= 0) {
        req.originalUrl = req.originalUrl.slice(0, index);
    }

    connect_server.connect_server('GET', req.originalUrl, req.query, function(data) {
        res.json(data);
    });
});

//提交单个文档
router.get('/getOnedocument', function(req, res, next) {

    connect_server.connect_server('GET', req.originalUrl, req.query, function(data) {
        console.log(data);
        res.json(data);
    });
});

//删除某个文档
router.get('/delete', function(req, res, next) {

    connect_server.connect_server('GET', req.originalUrl, req.query, function(data) {
        console.log(data);
        res.json(data);
    });
});

module.exports = router;