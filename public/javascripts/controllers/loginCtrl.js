app.controller('loginCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


    $scope.user = {};
    $scope.resultmsg = '';

    /**
     * 登录
     */
    $scope.loginSubmit = function() {
        var accountname = $scope.user.accountname;
        var password = $scope.user.password;

        if (!accountname) {
            $scope.resultmsg = '请输入用户名';
        } else if (!password) {
            $scope.resultmsg = '请输入密码';
        } else {
            $http({
                method: 'POST',
                url: '/user/login',
                data: {
                    accountname: $scope.user.accountname,
                    password: md5($scope.user.password)
                }
            }).then(
                function success(resp) {
                    //响应成功时调用，resp是一个响应对象  
                    if (resp.data.code == '0') {
                        if($location.url()=='/login'){
                            $location.url('/index/info');
                        }else{
                            $window.location.reload();
                        }
                    } else {
                        $scope.resultmsg = resp.data.msg;
                    }
                },
                function error(resp) {
                    // 响应失败时调用，resp带有错误信息  
                    $window.location.href = "/#!/login";
                }
            );
        }
    };
}]);