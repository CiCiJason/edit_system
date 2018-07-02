var express = require('express');
var router = express.Router();


var async = require('async');
var formidable = require('formidable'),
    fs = require('fs'),
    // TITLE = 'photos上传',
    PHOTOS_UPLOAD_FOLDER = '/photos/', //图片最后存储的路径
    PHOTOS_TEMP_FOLDER = '/temp/', //图片临时存放的路径
    PHOTOS_ABSOLUTE_FOLDER = "E:\\workspace\\github\\edit_system\\public\\photos\\", //图片最后存储的绝对路径
    domain = "http://localhost:3000"; //图片所在的服务器



/* GET home page. */
router.post('/', function(req, res, next) {



    let form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public' + PHOTOS_TEMP_FOLDER; //设置上传文件的缓存目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小2M

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.locals.error = err;
            res.render('index', { title: TITLE });
            return;
        }
        // console.log("The file is:");
        // console.log(files);

        // let extName = ''; //后缀名
        // // switch (files.fulAvatar.type) {
        // switch (files.file.type) {

        //     case 'image/pjpeg':
        //         extName = 'jpg';
        //         break;
        //     case 'image/jpeg':
        //         extName = 'jpg';
        //         break;
        //     case 'image/png':
        //         extName = 'png';
        //         break;
        //     case 'image/x-png':
        //         extName = 'png';
        //         break;
        // }
        // console.log("extName:" + extName);
        // console.log("extName length:" + extName.length);

        // if (extName.length == 0) {
        //     res.locals.error = '只支持png和jpg格式图片';
        //     res.render('index', { title: TITLE });
        //     console.log("extName done.");
        //     //删除缓存区的文件
        //     let tempPath = files.fulAvatar.path;
        //     fs.unlink(tempPath, function(err) {
        //         if (err) throw err;
        //         //console.log('成功')
        //     });
        // } else {
        //相对项目根目录的用户照片文件夹路径，fs.renameSync使用相对根目录的路径
        // let userName = 'liuqin';

        let month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1;
        let date = new Date().getDate() +1 <10 ? '0' + (new Date().getDate()) : new Date().getDate();
        let today = String(new Date().getFullYear()) + month + date;


        // let userPhotoPath = PHOTOS_UPLOAD_FOLDER + res.locals.user.userName + '/';
        let userPhotoPath = PHOTOS_UPLOAD_FOLDER + today + '/';  //   /photos/20180703/

        //console.log("save the file.");

        // let photoName = Math.random() + '.' + extName;
        let photoName = files.file.name;         //  111.jpg

        //图片写入地址，不同用户文件夹不一样；
        let newPath = 'public' + userPhotoPath + photoName;    //   "public/photos/20180703/111.jpg"


        //显示地址；
        let showUrl = domain + userPhotoPath + photoName;     //     "http://localhost:3000/photos/20180703/111.jpg"
        //用户照片文件夹的绝对路径，因为fs.mkdir创建文件夹必须使用绝对路径

        let userPhotoFolderPath = PHOTOS_ABSOLUTE_FOLDER + today;   // "E:\workspace\yangziyun-angularJs\public\photos\20180703"


        async.series([ //async.series函数可以控制函数按顺序执行，从而保证最后的函数在所有其他函数完成之后执行
                function(cb) {
                    //判断用户的照片文件夹是否存在，不存在就创建一个
                    fs.exists(userPhotoFolderPath, function(exists) {
                        if (!exists) {
                            //console.log('文件夹不存在');
                            fs.mkdir(userPhotoFolderPath, function(err) {
                                if (err)
                                //console.error(err);
                                //console.log('创建目录成功');
                                    cb();
                            });
                        } else {
                            //console.log('文件夹存在');
                            cb();
                        }
                    });
                },
                function(cb) {
                    //console.log("newPath", newPath);
                    //fs.renameSync(files.fulAvatar.path, newPath); //重命名暂存在缓存区的图片文件，相当于将其移动到用户照片文件夹下
                    fs.renameSync(files.file.path, newPath); //重命名暂存在缓存区的图片文件，相当于将其移动到用户照片文件夹下

                    // photosHandler.addIntoAPhotoTable(userName, photoName, userPhotoPath + photoName);
                    // res.json({
                    //      "newPath": showUrl
                    // });
                    let imgPath = newPath.slice(6);
                    res.json({ "link": imgPath });

                    cb();
                }
            ],
            function(error, results) {
                if (error) util.log('ERROR ' + error);
            }
        );
        // }

    });

});




module.exports = router;