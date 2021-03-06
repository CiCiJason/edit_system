app.controller('repasswordCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {

    $scope.user = {};
    $scope.err_tip = '';

    $scope.saveUser=function(){
        if($scope.user.password&&$scope.user.newpassword&&$scope.user.renewpassword){
            if($scope.user.newpassword==$scope.user.renewpassword){
                $http({
                    method:"PUT",
                    url:'/user/repassword',
                    data:{
                        password: md5($scope.user.password),
                        newpassword: md5($scope.user.newpassword),
                        renewpassword: md5($scope.user.renewpassword)
                    }
                }).then(function success(data){
                    if(data.data.code=='0'){
                        $scope.user={};
                        $scope.save_tip = data.data.msg;
                        angular.element('.save_tip').modal('show');
        
                        setTimeout(function () {
                            angular.element('.save_tip').modal('hide');
                        }, 1500);
                    }else{
                        $scope.err_tip = data.data.msg;
                        $scope.user={};
                    }
                },function error(resp){
                    $scope.err_tip = "修改失败，请重新尝试";
                    $scope.user={};
                });
            }else{
                $scope.err_tip='两次输入的新密码不一致';
            }
        }else{
            $scope.err_tip='请输入原密码和新密码';
        }
    }

    $scope.cancel=function () {
        $scope.user={};
        $scope.err_tip='';
    }

}]);