//连接后端
var request = require('request');
var serverName = require('../conf/config');
//判断obj是否为json对象  
//    
var request=request.defaults({jar:true});

module.exports = {
    connect_server: function(method, url, data, callback) {
        if (method == 'POST'|| method == 'PUT' || method == 'PATCH') {
            request({
                    method: method,
                    url: serverName.serverName + url,
                    body: data,
                    json: true
                },
                function(error, response, body) {

                    if (error) {
                        console.log(error);
                        callback({code:'500',msg:'连接后台服务器出错'})
                    }

                    callback(body);
                })
            } 
        if (method == 'GET' || method == 'DELETE') {
            request({
                    method: method,
                    url:serverName.serverName + url,
                    qs: data,
                    json: true
                },
                function(error, response, body) {

                    if (error) {
                        console.log(error);
                        callback({code:'500',msg:'连接后台服务器出错'})
                    }

                    callback(body); 

                })
            }
        }
    };