app.controller('addCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    //初始化
    //获取数据库中，目前的正式文章
    //做分页处理

    $scope.user = {};


    function init() {
        $http({
            method: 'GET',
            url: '/users/read'
        }).then(
            function success(data) {
                $scope.users = data.data;
            },
            function error(resp) {
                console.log('请求有误');
            }
        );
    }

    //init();


    //编辑用户信息
    $scope.edit = function(id, username) {
        $scope.user.id = id;
        $scope.user.username = username;
        $('.addUser').modal('show');
    }


    //保存信息去数据库
    $scope.addUser = function(id, name) {
        $('.addUser').modal('hide');
        $http({
            method: "POST",
            url: '/users/save',
            data: $scope.user
        }).then(function success(data) {
            console.log('新增成功');
            //刷新当前页面
            //待做
        }, function error(resp) {
            console.log('保存用户新信息有错');
        });

    }




    //从列表中删除某篇文章，做是否删除的确认操作
    $scope.remove = function(id) {
        $scope.deleteid = id;
        angular.element('.remove-document').modal('show');
    }

    //从数据库中删除某篇文章
    $scope.remove_user = function(id) {
        angular.element('.remove-user').modal('hide');
        $http({
            method: 'GET',
            url: '/users/delete',
            params: id
        }).then(
            function success(data) {
                //刷新页面
                $scope.save_tip = '删除成功';
                angular.element('.save_tip').modal('show');


                setTimeout(function() {
                    angular.element('.save_tip').modal('hide');
                    setTimeout(function() {
                        // $window.location.href = "#!/info";
                        // 刷新当前页面
                        $state.reload('index.modify');
                    }, 400);
                }, 1500);
            },
            function error(resp) {

            }
        );
    }


    //重置密码前的确认操作
    $scope.reset = function(id) {
        $scope.resetid = id;
        angular.element('.reset-password').modal('show');
    }

    //初始化数据库中的密码
    $scope.reset_password = function(id) {
        angular.element('.reset-password').modal('hide');
        $http({
            method: "POST",
            url: '/users/reset',
            data: {
                id: id
            }
        }).then(function success(data) {
            console.log("重置成功");
            //
            //提示
            $scope.save_tip = "重置成功";
            $('.save_tip').modal('show');

            setTimeout(function() {
                $('.save_tip').modal('hide');
                $scope.save_tip = "";
            }, 1500);

            //showTip('save_tip', '.save_tip', '重置成功');

        }, function error(resp) {
            cosnole.log("重置密码失败")
        });
    }



    // //显示提示信息
    // function showTip(bianling, modal_div, msg) {
    //     $scope.bianliang = msg;
    //     $(modal_div).modal('show');

    //     setTimeout(function() {
    //         $(modal_div).modal('hide');
    //         $scope.bianliang = "";
    //     }, 1500);
    // }


}]);