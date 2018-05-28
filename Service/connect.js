//连接后端
var request = require('request');
var serverName = require('../conf/config');
//判断obj是否为json对象  
function isJson(obj) {
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}

module.exports = {
    connect_server: function(method, url, data, callback) {
        if (method == 'POST') {
            request({
                    method: method,
                    url: serverName.serverName + '/api' + url + '.php',
                    // url: serverName.serverName + '/api' + url,
                    // 'content-type': 'application/json',
                    // json: data
                    form: data
                },
                function(error, response, body) {
                    //var bodyjson = JSON.parse(body);

                    if (error) {
                        callback({ 'error': "error" });
                    }

                    // callback(body);
                    body = { code: '200', username: 'liu', auth: 'false' };
                    callback(body);

                })
        }
        if (method == 'GET') {
            request({
                    method: method,
                    url: serverName.serverName + '/api' + url + '.php',
                    // url: serverName.serverName + '/api' + url,

                    'content-type': 'application/json',
                    json: data
                },
                function(error, response, body) {
                    //var bodyjson = JSON.parse(body);

                    if (error) {
                        callback({ 'error': "error" });
                    }

                    callback(body);

                })
        }
    }
};