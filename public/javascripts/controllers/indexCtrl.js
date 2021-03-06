app.controller('indexCtrl', ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {

    //初始化
    //获取数据库中，目前还是草稿的文章
    //全部显示，不做分页处理



    $scope.username = '';

    function init() {
        $http({
            method: 'GET',
            url: '/document/list',
            params: { draft: true }
        }).then(
            function success(data) {
                $scope.documents = data.data;
            },
            function error(resp) {
                console.log(resp);
            }
        );

        $http({
            method: 'GET',
            url: '/type/list',
            params:{all:'typename'}
        }).then(
            function success(data) {
                $scope.types = data.data;
            },
            function error(resp) {
                console.log(resp);
            }
        );
    }

    init();



    //从列表中删除某篇文章，做是否删除的确认操作
    $scope.remove = function (id) {
        $scope.deleteid = id[0][0];
        angular.element('.remove-document').modal('show');
    }

    //从数据库中删除某篇文章
    $scope.delete = function (id) {
        $scope.deleteid = "";
        angular.element('.remove-document').modal('hide');

        $http({
            method: 'DELETE',
            url: '/document/delete',
            params: { _id: id }
        }).then(
            function success(data) {
                $scope.save_tip = data.data.msg;
                angular.element('.save_tip').modal('show');

                setTimeout(function () {
                    angular.element('.save_tip').modal('hide');
                    setTimeout(function () {
                        init();
                    }, 400);
                }, 1500);

            },
            function error(resp) {
                //删除失败
                $scope.save_tip = '删除失败';
                angular.element('.save_tip').modal('show');

                setTimeout(function () {
                    angular.element('.save_tip').modal('hide');
                    setTimeout(function () {
                        init();
                    }, 400);
                }, 1500);
            }
        );
    }


    //将某篇文章从草稿箱提交至数据库
    $scope.submit = function (id) {
        $http({
            method: 'POST',
            url: '/document/add',
            data: {
                _id: id[0][0],
                draft: false
            }
        }).then(function success(data) {
            if (data.data.code == '0') {
                $scope.save_tip = '操作成功';
                angular.element('.save_tip').modal('show');

                setTimeout(function () {
                    angular.element('.save_tip').modal('hide');
                    setTimeout(function () {
                        init();
                    }, 400);
                }, 2000);
            } else {
                $scope.save_tip = '操作失败';
                angular.element('.save_tip').modal('show');

                setTimeout(function () {
                    angular.element('.save_tip').modal('hide');
                }, 2000);
            }
        }, function error(resp) {
            $scope.save_tip = '操作失败';
            angular.element('.save_tip').modal('show');

            setTimeout(function () {
                angular.element('.save_tip').modal('hide');
            }, 2000);
        });
    }

}]);