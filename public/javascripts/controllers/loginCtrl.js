app.controller('loginCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {


    $scope.user = {};
    $scope.resultmsg = '';

    /**
     * 登录
     */
    $scope.loginSubmit = function() {
        var username = $scope.loginForm.username;
        var password = $scope.loginForm.password;

        if (!username) {
            $scope.resultmsg = '请输入用户名';
        } else if (!password) {
            $scope.resultmsg = '请输入密码';
        } else {
            $http({
                method: 'POST',
                url: '/login/verify',
                data: {
                    username: $scope.user.username,
                    password: md5($scope.user.password)
                }
            }).then(
                function success(resp) {
                    //响应成功时调用，resp是一个响应对象  
                    if (resp.data.code == 200) {
                        $window.location.href = "#!/index/info";
                    } else {
                        $scope.resultmsg = resp.data.message;
                    }

                },
                function error(resp) {
                    // 响应失败时调用，resp带有错误信息  
                    $window.location.href = "#!/login";
                }
            );
        }
    };


}]);