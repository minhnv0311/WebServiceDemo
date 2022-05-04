angular.module('WebApiApp').controller('GetStockPriceController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {


    $scope.$on('$viewContentLoaded', function () {
        $scope.ListGetData = [];

        //$scope.getDataPrice();
        //setInterval($scope.getDataPrice, 180000);

        $scope.GetPriceHistory();

    });

    $scope.getStatus = function (status,type) {
        switch (status) {
            case 'WATTING':
                return type == 1 ? "warning" : "Đang lấy số liệu";
            case 'SUCCESS':
                return type == 1 ? "success" : "Thành công";
            case 'ERROR':
                return type == 1 ? "danger" : "Thất bại";
        }
    }

    $scope.GetPriceHistory = function () {
        $http({
            method: 'GET',
            url: '/Stock/PriceHistory',
        }).then(function successCallback(response) {
            console.log(response.data);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            
        });
    }


    $scope.getDataPrice = function () {
        
        var obj = {
            dateStart: new Date(),
            dateEnd: null,
            status: 'WATTING',
        }
        $scope.ListGetData.push(obj);
        $http({
            method: 'GET',
            url: '/Stock/Prices',
        }).then(function successCallback(response) {
            obj.dateEnd = new Date();
            obj.status = "SUCCESS";
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
                obj.dateEnd = new Date();
                obj.status = "ERROR";
        });
    }
}]);