app.controller('viewCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    $scope.document={};
    function init() {
        $http({
            method: 'GET',
            url: '/document/view',
            params: { _id: $location.$$search.id }
        }).then(
            function success(data) {
                if(data.data){
                    $scope.document = data.data;
                }else{
                    $scope.document.title = '请求出错，请执行正确的请求';
                }    
            },
            function error(resp) {
                console.log(resp);
                $scope.document.title = '请求出错，请执行正确的请求';
            }
        );
    }

    init();
}]);