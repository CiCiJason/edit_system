app.controller('inputCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.document = {};
    $scope.save_tip = '';


    //有？id=xxxx,则初始化的时候，还需要读取该篇文档信息

    //文档类型初始化
    function init() {
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
        if($location.$$search.id){
            $http({
                method: 'GET',
                url: '/document/view',
                params: { _id: $location.$$search.id }
            }).then(
                function success(data) {
                    $scope.document = data.data;
                },
                function error(resp) {
                    console.log(resp);
                }
            );
        }
    }

    init();


    $scope.submit = function(draft) {

        $scope.document.draft = draft;

        if (!$scope.document.typenameid) {
            $scope.tip = "请选择文档类型";
        } else if (!$scope.document.title) {
            $scope.tip = "请输入文档标题";
        } else if (!$scope.document.releaseTime) {
            $scope.tip = "请输入文档发布时间";
        } else if (!$scope.document.content) {
            $scope.tip = "请输入文档正文";
        } else {
            $http({
                method: 'POST',
                url: '/document/add',
                data: $scope.document
            }).then(
                function success(data) {
                    if(data.data.code=='0'){
                        $scope.save_tip = '操作成功';
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
                    }else{
                        $scope.save_tip = '操作失败';
                        angular.element('.save_tip').modal('show');

                        setTimeout(function() {
                            angular.element('.save_tip').modal('hide');
                        }, 2000);
                    }
                },
                function error(resp) {
                    $scope.save_tip = '操作失败';
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


}]);