var express = require('express');
var router = express.Router();
var photosServer = require('../conf/config');

var async = require('async');
var formidable = require('formidable'),
    fs = require('fs'),
    PHOTOS_UPLOAD_FOLDER = '/photos/', //图片最后存储的路径
    PHOTOS_TEMP_FOLDER = '/temp/', //图片临时存放的路径
    PHOTOS_ABSOLUTE_FOLDER=process.cwd()+"\\public\\photos\\",//图片最后存储的绝对路径
    domain = photosServer.photosServer;



/* GET home page. */
router.post('/', function (req, res, next) {

    let form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public' + PHOTOS_TEMP_FOLDER; //设置上传文件的缓存目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小2M

    form.parse(req, function (err, fields, files) {

        if (err) {
            res.locals.error = err;
            res.render('index', { title: TITLE });
            return;
        }

        let fulldate = new Date();
        let month = fulldate.getMonth() + 1 < 10 ? '0' + (fulldate.getMonth() + 1) : fulldate.getMonth() + 1;
        let date = fulldate.getDate() + 1 < 10 ? '0' + (fulldate.getDate()) : fulldate.getDate();
        let today = String(fulldate.getFullYear()) + month + date;


        let userPhotoPath = PHOTOS_UPLOAD_FOLDER + today + '/';  //   /photos/20180703/

        let photoName = files.file.name;         //  111.jpg

        //图片写入地址，不同用户文件夹不一样；
        let newPath = 'public' + userPhotoPath + photoName;    //   "public/photos/20180703/111.jpg"


        //显示地址；
        let showUrl = domain + userPhotoPath + photoName;     //     "http://localhost:3002/photos/20180703/111.jpg"
        //用户照片文件夹的绝对路径，因为fs.mkdir创建文件夹必须使用绝对路径

        let userPhotoFolderPath = PHOTOS_ABSOLUTE_FOLDER + today;   // "E:\workspace\yangziyun-angularJs\public\photos\20180703"


        async.series([ //async.series函数可以控制函数按顺序执行，从而保证最后的函数在所有其他函数完成之后执行
            function (cb) {

                fs.readdir(userPhotoFolderPath, (err, file) => {
                    if (err) {
                        fs.mkdir(userPhotoFolderPath, (err1) => {
                            if (err1) { console.log(err1); }
                            cb();
                        });
                    } else {
                        cb();
                    }
                })
            },
            function (cb) {
                fs.renameSync(files.file.path, newPath); //重命名暂存在缓存区的图片文件，相当于将其移动到用户照片文件夹下
                let imgPath = domain + newPath.slice(6);
                res.json({ "link": imgPath });

                cb();
            }
        ],
            function (error, results) {
                if (error) util.log('ERROR ' + error);
            }
        );

    });

});


module.exports = router;