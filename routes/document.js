var express = require('express');
var router = express.Router();
var connect_server = require('../Service/connect');


//获取所有类型列表

// router.get('/list', function (req, res, next) {
//     connect_server.connect_server('GET', req.originalUrl, req.query, function (data) {
//         console.log(data);
//         return res.json(data);
//     })
// });

router.get('/list', function (req, res, next) {
    connect_server.connect_server('GET', req.originalUrl, req.query, function (data) {
        console.log(data);
        return res.json(data);
    })
});


//新添文档
router.post('/add', function (req, res, next) {
    connect_server.connect_server('POST', req.originalUrl, req.body, function (data) {
        console.log(data);
        res.json(data);
    });
});


//删除某个类型

router.delete('/delete', function (req, res, next) {
    connect_server.connect_server('DELETE', req.originalUrl, req.query, function (data) {
        console.log(data);
        return res.json(data);
    })
});


//编辑类型
router.put('/edit', function (req, res, next) {
    if (req.body.newtype) {
        connect_server.connect_server('PUT', req.originalUrl, req.body, function (data) {
            console.log(data);
            return res.json(data);
        });
    } else {
        return res.json({ code: '1', msg: '文档类型不能为空' });
    }
});


//查看某篇文章
router.get('/view', function (req, res, next) {
    connect_server.connect_server('GET', req.originalUrl, req.query, function (data) {
        console.log(data);
        res.json(data);
    });
})




module.exports = router;