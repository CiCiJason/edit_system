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
            url: '/users/add',
            templateUrl: '/users/add',
            controller: 'addCtrl'
        })
        .state('index.repassword', {
            url: '/users/repassword',
            templateUrl: '/users/repassword',
            controller: 'repasswordCtrl'
        })
        .state('logout', {
            url: '/logout',
            templateUrl: '/logout'
        });
    //  默认路由
    $urlRouterProvider.otherwise('login');

}]);