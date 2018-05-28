app.controller('inputCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.document = {};
    $scope.save_tip = '';


    $scope.submit = function(draft) {

        $scope.document.id = $location.$$search.id;
        $scope.document.draft = draft;

        if (!$scope.document.type) {
            $scope.tip = "请选择文档类型";
        } else if (!$scope.document.title) {
            $scope.tip = "请输入文档标题";
        } else if (!$scope.document.time) {
            $scope.tip = "请输入文档发布时间";
        } else if (!$scope.document.content) {
            $scope.tip = "请输入文档正文";
        } else {
            $http({
                method: 'POST',
                url: '/document/save',
                data: $scope.document
            }).then(
                function success(data) {
                    //响应成功时调用，resp是一个响应对象  
                    console.log('成功');
                    $scope.save_tip = '保存成功';
                    angular.element('.save_tip').modal('show');


                    setTimeout(function() {
                        angular.element('.save_tip').modal('hide');
                        setTimeout(function() {
                            if ($scope.document.draft) {
                                $window.location.href = "#!/index/info";
                            } else {
                                $window.location.href = "#!/index/modify";
                            }
                        }, 400);
                    }, 1500);



                },
                function error(resp) {

                    console.log('失败');
                    $scope.save_tip = '提交失败,请重新提交';
                    angular.element('.save_tip').modal('show');

                    setTimeout(function() {
                        angular.element('.save_tip').modal('hide');
                    }, 2000);

                }
            );
        }
    }

    $scope.inputOptions = {
        imageUploadURL: '/upload_image'
    };


    //编辑某一个存在数据库中的文章
    if ($location.$$search.id && $location.$$search.type == 'edit') {
        $http({
            method: 'GET',
            url: '/document/getOnedocument',
            params: {
                id: $location.$$search.id
            }
        }).then(function success(data) {
                // $scope.document.type = data.data.type;
                // $scope.document.title = data.data.title;
                // $scope.document.subtitle = data.data.subtitle;
                // $scope.document.time = data.data.time;
                // $scope.document.content = data.data.content;

                $scope.document.type = '通知公告';
                $scope.document.title = '标题1';
                $scope.document.subtitle = '';
                $scope.document.time = new Date();
                $scope.document.content = '这是正文';
            },
            function error(resp) {

            });
    }




}]);