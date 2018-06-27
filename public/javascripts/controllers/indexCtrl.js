app.controller('indexCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    //初始化
    //获取数据库中，目前还是草稿的文章
    //全部显示，不做分页处理



    $scope.username = '';

    function init() {
        $http({
            method: 'GET',
            url: '/document/read',
            params: { draft: true }
        }).then(
            function success(data) {
                $scope.drafts = data.data;
            },
            function error(resp) {
                console.log('请求有误');
            }
        );
    }

    // init();


    //编辑草稿箱中的一篇文章
    //直接通过网址链接写，在输入页做判断




    //从列表中删除某篇文章，做是否删除的确认操作
    $scope.remove = function(id) {
        $scope.deleteid = id;
        angular.element('.remove-document').modal('show');
    }

    //从数据库中删除某篇文章
    $scope.remove_document = function(id) {
        angular.element('.remove-document').modal('hide');

        $http({
            method: 'GET',
            url: '/document/delete',
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
                        $state.reload('index.info');
                    }, 400);
                }, 1500);

            },
            function error(resp) {

            }
        );
    }




}]);