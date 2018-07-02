app.controller('viewCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location) {
    
    function init() {
        $http({
            method: 'GET',
            url: '/document/view',
            params: { id: $location.$$search.id }
        }).then(
            function success(data) {
                $scope.document = data.data;
            },
            function error(resp) {
                console.log(resp);
            }
        );
    }

    init();

}]);