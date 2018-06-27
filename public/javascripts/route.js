var app = angular.module('editSystem', ['ui.router', 'froala'])
    .value('froalaConfig', {
        toolbarInline: false,
        placeholderText: '请在这里输入你的文档正文内容'
    });

/**
 * 系统设置
 */
app.config(['$stateProvider', '$urlRouterProvider', '$interpolateProvider', function($stateProvider, $urlRouterProvider, $interpolateProvider) {

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');


    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/login',
            controller: 'loginCtrl'
        })
        .state('index', {
            url: '/index',
            templateUrl: '/index'
        })
        .state('index.info', {
            url: '/info',
            templateUrl: '/index/info',
            controller: 'indexCtrl'
        })
        .state('index.input', {
            url: '/input',
            templateUrl: '/input',
            controller: 'inputCtrl'
        })
        .state('index.modify', {
            url: '/modify',
            templateUrl: '/modify',
            controller: 'modifyCtrl'
        })
        .state('index.add', {
            url: '/user/add',
            templateUrl: '/user/add',
            controller: 'addCtrl'
        })
        .state('index.repassword', {
            url: '/user/repassword',
            templateUrl: '/user/repassword',
            controller: 'repasswordCtrl'
        })
        .state('logout', {
            url: '/logout',
            templateUrl: '/logout'
        });
    //  默认路由
    $urlRouterProvider.otherwise('login');

}]);

/**
 * 自定义显示年月日过滤器
 * monogoose的时候格式是这样的2018-06-27T07:43:12.161Z
 */
app.filter(date,function () {
    return function(text){
        var text=String(text);
        return text.substr(0,10);
    }
});