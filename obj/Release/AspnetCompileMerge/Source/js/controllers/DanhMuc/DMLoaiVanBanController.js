
angular.module('WebApiApp').controller('DMLoaiVanBanController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLoaiVanBan/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiVanBan();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiVanBan = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiVanBan/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey 
        }).then(function successCallback(response) {

            $scope.DMLoaiVanBan = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLoaiVanBan();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiVanBan();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);
