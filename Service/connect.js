//连接后端
var request = require('request');
var serverName = require('../conf/config');
//判断obj是否为json对象  
//    

module.exports = {
    connect_server: function(method, url, data, callback) {
        if (method == 'POST') {
            request({
                    method: method,
                    url: serverName.serverName + url,
                    form: data,
                    json: true
                },
                function(error, response, body) {

                    if (error) {
                        console.log(error);
                        callback({code:'500',nsg:'连接后台服务器出错'})
                    }

                    callback(body);
                })
            } 
        if (method == 'GET') {
            request({
                    method: method,
                    url:serverName.serverName + url,
                    qs: data||'1',
                    json: true
                },
                function(error, response, body) {

                    if (error) {
                        console.log(error);
                        callback({code:'500',nsg:'连接后台服务器出错'})
                    }

                    callback(body); 

                })
            }
        }
    };