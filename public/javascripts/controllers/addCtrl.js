app.controller('addCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.user = {};
    $scope.err_tip='';

    function init() {
        $http({
            method: 'GET',
            url: '/user/list'
        }).then(
            function success(data) {
                $scope.users = data.data;
            },
            function error(resp) {
                console.log('请求有误');
            }
        );
    }

    init();


    //添加新的用户
    $scope.addUser = function(id, name) {
        // $('.addUser').modal('hide');
        var accountname=$scope.user.accountname;
        var password=$scope.user.password;
        var repassword=$scope.user.repassword;
        if(accountname&&password&&repassword){
            if(password==repassword){
                $http({
                    method: "POST",
                    url: '/user/register',
                    data: {
                        accountname:$scope.user.accountname,
                        password:md5($scope.user.password),
                        repassword:md5($scope.user.repassword)
                    }
                }).then(function success(data) {
                    if(data.data.code=='0'){
                        $scope.user={};
                        $('.addUser').modal('hide');
                        // $window.location.reload();
                        init();
                    }else{
                        $scope.err_tip=data.data.msg;
                    }
                }, function error(resp) {
                    console.log(resp);
                    //新建用户失败
                    //2秒蒙层
                });
            }else{
                $scope.err_tip='两次输入的密码不一致';
            }
        }else{
            $scope.err_tip='账户名和密码不能为空';
        }
    }


    //从列表中删除用户，做是否删除的确认操作
    $scope.remove = function(id) {
        $scope.deleteid = id[0][0];
        angular.element('.remove-user').modal('show');
    }


    //从数据库中删除用户
    $scope.delete = function(id) {
        $scope.deleteid="";
        angular.element('.remove-user').modal('hide');
        $http({
            method: 'delete',
            url: '/user/delete',
            params: {
                _id: id
            },
        }).then(
            function success(data) {
                //删除成功
                $scope.save_tip = data.data.msg;
                angular.element('.save_tip').modal('show');

                setTimeout(function() {
                    angular.element('.save_tip').modal('hide');
                    setTimeout(function() {
                        // $window.location.reload();
                        init();
                    }, 400);
                }, 1500);
            },
            function error(resp) {
                //删除失败
                $scope.save_tip = '删除失败';
                angular.element('.save_tip').modal('show');

                setTimeout(function() {
                    angular.element('.save_tip').modal('hide');
                    setTimeout(function() {
                        // $window.location.reload();
                        init();
                    }, 400);
                }, 1500);
            }
        );
    }


    //重置密码前的确认操作
    $scope.reset = function(id) {
        $scope.resetid = id[0][0];
        angular.element('.reset-password').modal('show');
    }

    //重置密码
    $scope.reset_password = function(id) {
        angular.element('.reset-password').modal('hide');
        $http({
            method: "PUT",
            url: '/user/resetpwd',
            data: {
                _id: id
            },
        }).then(function success(data) {
            $scope.save_tip = data.data.msg;
            angular.element('.save_tip').modal('show');

            setTimeout(function() {
                angular.element('.save_tip').modal('hide');
                setTimeout(function() {
                    // $window.location.reload();
                    init();
                }, 400);
            }, 1500);
        }, function error(resp) {
            //重置失败
            $scope.save_tip = '重置失败';
            angular.element('.save_tip').modal('show');

            setTimeout(function() {
                angular.element('.save_tip').modal('hide');
                setTimeout(function() {
                    // $window.location.reload();
                    init();
                }, 400);
            }, 1500);
        });
    }


//设置管理员
    $scope.setAdmin = function(id) {
        $http({
            method: "PUT",
            url: '/user/setAdmin',
            data: {
                _id: id[0][0]
            },
        }).then(function success(data) {
            $scope.save_tip = data.data.msg;
            angular.element('.save_tip').modal('show');

            setTimeout(function() {
                angular.element('.save_tip').modal('hide');
                setTimeout(function() {
                    // $window.location.reload();
                    init();
                }, 400);
            }, 1500);
        }, function error(resp) {
            //重置失败
            $scope.save_tip = '重置失败';
            angular.element('.save_tip').modal('show');

            setTimeout(function() {
                angular.element('.save_tip').modal('hide');
                setTimeout(function() {
                    // $window.location.reload();
                    init();
                }, 400);
            }, 1500);
        });
    }

    //取消管理员
    $scope.cancelAdmin = function(id) {
        $http({
            method: "PUT",
            url: '/user/cancelAdmin',
            data: {
                _id: id[0][0]
            },
        }).then(function success(data) {
            $scope.save_tip = data.data.msg;
            angular.element('.save_tip').modal('show');

            setTimeout(function() {
                angular.element('.save_tip').modal('hide');
                setTimeout(function() {
                    // $window.location.reload();
                    init();
                }, 400);
            }, 1500);
        }, function error(resp) {
            //重置失败
            $scope.save_tip = '重置失败';
            angular.element('.save_tip').modal('show');

            setTimeout(function() {
                angular.element('.save_tip').modal('hide');
                setTimeout(function() {
                    // $window.location.reload();
                    init();
                }, 400);
            }, 1500);
        });
    }



}]);
