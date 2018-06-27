var express = require('express');
var router = express.Router();
var connect_server = require('../Service/connect');



//用户登录验证

router.post('/login',function(req,res,next){
    if(req.body.accountname&&req.body.password){
        connect_server.connect_server('POST',req.originalUrl,req.body,function(data){
            console.log(data);
            return res.json(data);
        });
    }else{
        return res.json({code:'1',msg:'用户名和密码不能为空'});
    }
});




//用户注册

router.post('/register',function(req,res,next){
    if(req.body.accountname&&req.body.password&&req.body.repassword){
        if(req.body.password==req.body.repassword){
            connect_server.connect_server('POST',req.originalUrl,req.body,function (data) { 
                console.log(data);
                return res.json(data);
            });
        }else{
            return res.json({code:'2',msg:'两次输入的密码不一致'});
        }
    }else{
        return res.json({code:'1',msg:'用户名和密码不能为空'});
    }
});


//获取所有用户列表，除admin

router.get('/list',function(req,res,next){
    connect_server.connect_server('GET',req.originalUrl,req.query,function(data){
        console.log(data);
        return res.json(data);
    })
});






/* 添加新的管理员*/
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