app.controller('typeCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.doc = {};
    $scope.editdoc={};
    $scope.err_tip = '';
    $scope.type_err_tip='';
    $scope.editid='';


    function init() {
        $http({
            method: 'GET',
            url: '/type/list',
            params:{all:'all'}
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

    //添加新的文档类型
    $scope.addType=function(){
        if($scope.doc.typename){
            $http({
                method:"POST",
                url:'/type/add',
                data:$scope.doc
            }).then(function success(data){
                if(data.data.code=='0'){
                    $scope.doc={};
                    $('.addType').modal('hide');
                    init();
                }else{
                    $scope.err_tip=data.data.msg;
                }
            },function error(resp){
                $scope.save_tip = "修改失败，请重新尝试";
                $scope.user={};
            });
        }else{
            $scope.err_tip='请输入文档类型名称';
        }
    }


    //修改新的文档类型的名称
    $scope.edit=function(type){
        $scope.editid=type[0][0]._id;
        $scope.editdoc.typename=type[0][0].typename;
        $scope.oldtype=type[0][0].typename;
        angular.element('.edit_type').modal('show');
    }


    //保存修改
    $scope.editType=function(){
        if($scope.editdoc.typename){
            if($scope.editdoc.typename!=$scope.oldtype){
                $http({
                    method:"PUT",
                    url:'/type/edit',
                    data:{
                        oldtype:$scope.oldtype,
                        newtype:$scope.editdoc.typename,
                        _id:$scope.editid
                    }
                }).then(function success(data){
                    if(data.data.code=='0'){
                        $scope.editdoc={};
                        $scope.editid='';
                        $scope.oldtype='';
                        $scope.type_err_tip='';
                        $('.edit_type').modal('hide');
                        init();
                    }else{
                        $scope.type_err_tip=data.data.msg;
                    }
                },function error(resp){
                    console.log('请求服务器出错');
                });
            }else{
                $scope.type_err_tip='新文档类型和原文档类型一致，请重新输入';
            }
        }else{
            $scope.type_err_tip='请输入文档类型名称';
        }
    }

    //取消编辑
    $scope.canceledit=function(){
        $scope.type_err_tip='';
        $('.edit_type').modal('hide');
    }


    //从列表中删除用户，做是否删除的确认操作
    $scope.remove = function(id) {
        $scope.deleteid = id[0][0];
        angular.element('.remove-type').modal('show');
    }


    //删除文档类型
    $scope.delete = function(id) {
        $scope.deleteid="";
        angular.element('.remove-type').modal('hide');
        $http({
            method: 'delete',
            url: '/type/delete',
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
                        init();
                    }, 400);
                }, 2000);
            },
            function error(resp) {
                //删除失败
                $scope.save_tip = '删除失败';
                angular.element('.save_tip').modal('show');

                setTimeout(function() {
                    angular.element('.save_tip').modal('hide');
                    setTimeout(function() {
                        init();
                    }, 400);
                }, 2000);
            }
        );
    }

}]);