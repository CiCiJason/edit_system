app.controller('modifyCtrl', ['$scope', '$http', function ($scope, $http) {
    //初始化
    $scope.document = {};
    $scope.document.typename = 'all';
    //做分页处理
    // $scope.pageoption = {};


    // $scope.paginationConf = {
    //     currentPage: 1,
    //     itemsPerPage: 10,
    //     action: "",
    //     actionform: ""
    // };

    // $scope.counts='';
    // $scope.pages='';

    //获取数据库中，目前的正式文章
    // function getDocList(query,page) {
    //     $http({
    //         method: 'GET',
    //         url: '/document/list',
    //         params: {query,page}
    //     }).then(
    //         function success(data) {
    //             $scope.documents = data.data.documents;
    //             $scope.counts=data.data.counts;
    //             $scope.pages=data.data.count;
    //             $scope.pageoption = {
    //                 curr: page || 1,
    //                 all: data.data.count || 1,
    //                 count:5,

    //                 click: function (p) {
    //                     $http({
    //                         method: 'GET',
    //                         url: '/document/list',
    //                         params: {query:query,page:{page:p}}
    //                     }).then(
    //                         function success(data1) {
    //                             $scope.documents = data1.data.documents;
    //                             // $scope.counts = data.data.counts;
    //                             $scope.page = p;
    //                             // $scope.pages = data.data.pages;
    //                         }, function error(resp1) {
    //                             console.log('分页请求错误');
    //                         })
    //                 }
    //             };
    //             $scope.pageoption.click(1);

    //         },
    //         function error(resp) {
    //             console.log(resp);
    //         }
    //     )
    // }

    function getDocList(data) {
        $http({
            method: 'GET',
            url: '/document/list',
            params: data
        }).then(
            function success(data) {
                $scope.documents = data.data;
            }, function error(resp) {
                console.log(resp)
            });
    }

    function getTypeList() {
        $http({
            method: 'GET',
            url: '/type/list',
            params: {
                all: 'typename'
            }//all=typename表示从数据库中只输出typename字段
        }).then(
            function success(data) {
                $scope.types = data.data;
            },
            function error(resp) {
                console.log(resp);
            }
        )
    }

    function init() {
        getDocList({ draft: false });
        getTypeList();
    }

    init();


    //从列表中删除某篇文章，做是否删除的确认操作
    $scope.remove = function (id) {
        $scope.deleteid = id[0][0];
        angular.element('.remove-document').modal('show');
    }


    //从数据库中删除某篇文章
    $scope.delete = function (id) {
        $scope.deleteid = '';
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


    //设置置顶/取消置顶
    $scope.top = function (id, top) {
        $http({
            method: 'POST',
            url: '/document/add',
            data: {
                _id: id,
                top: top
            }
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
                $scope.save_tip = '操作失败';
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


    //筛选某一类文档
    $scope.changeTypename = function () {
        if ($scope.document.typename == 'all') {
            getDocList({ draft: false }, { page: 1 });
        } else {
            getDocList({ draft: false, typename: $scope.document.typename }, { page: 1 });
        }
    }

}]);