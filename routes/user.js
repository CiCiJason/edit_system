var express = require('express');
var router = express.Router();
var connect_server = require('../Service/connect');

//render新增用户页面

router.get('/add', function(req, res, next) {
    res.render('user/add', { layout: null });
});


//render修改密码页面

router.get('/repassword', function(req, res, next) {
    res.render('user/repassword', { layout: null });
});


//用户登录验证

router.post('/login',function(req,res,next){
    if(req.body.accountname&&req.body.password){
        connect_server.connect_server('POST',req.originalUrl,req.body,function(data){
            // console.log(data);
            // return res.json(data);
            if(data.code=='0'){
                req.session._id=data._id;
                req.session.accountname=data.accountname;
                req.session.logined=data.logined;
                req.session.admin=data.admin;
                return res.json({code:'0',msg:'登录成功'});
            }else{
                return res.json(data);
            }
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


//删除某个用户

router.delete('/delete',function(req,res,next){
    connect_server.connect_server('DELETE',req.originalUrl,req.query,function(data){
        console.log(data);
        return res.json(data);
    })
});


//重置密码

router.put('/resetpwd',function(req,res,next){
    connect_server.connect_server('PUT',req.originalUrl,req.body,function(data){
        console.log(data);
        return res.json(data);
    })
});


//修改密码

router.put('/repassword',function(req,res,next){
    connect_server.connect_server('PUT',req.originalUrl,req.body,function(data){
        console.log(data);
        return res.json(data);
    })
})


module.exports = router;