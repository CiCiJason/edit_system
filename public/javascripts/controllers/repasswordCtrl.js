app.controller('repasswordCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.user = {};
    $scope.tip = '';

    $scope.saveUser = function() {
        if (!$scope.user.password) {
            $scope.tip = '请输入原始密码';
            return;
        }
        if (!$scope.user.newpassword) {
            $scope.tip = '请输入新密码';
            return;
        }
        if (!$scope.user.renewpassword) {
            $scope.tip = '请再次输入新密码';
            return;
        }
        if ($scope.user.newpassword == $scope.user.renewpassword) {
            $http({
                method: "POST",
                url: '/users/repassword',
                data: {
                    password: md5($scope.user.password),
                    newpassword: md5($scope.user.newpassword),
                    renewpassword: md5($scope.user.renewpassword)
                }
            }).then(function success(data) {
                $scope.save_tip = "修改成功";
                angular.element('.save_tip').modal('show');

                setTimeout(function() {
                    $scope.save_tip = "";
                    $scope.user = {};
                    angular.element('.save_tip').modal('hide');
                }, 1500);

            }, function error(resp) {
                console.log('修改密码失败');
            });
        } else {
            $scope.tip = '两次输入的新密码不符';
        }
    }

}]);