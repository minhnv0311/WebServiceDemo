angular.module('WebApiApp').controller("ModalDMLoaiHinh_DNHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.check = $scope.$resolve.check;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiHinh_DN/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');

            $rootScope.LoadDMLoaiHinh_DN();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiHinh_DN/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            $rootScope.LoadDMLoaiHinh_DN();
            $scope.item = '';
            $scope.itemError = "";
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.ValidFCode = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiHinh_DN/ValidFCode?FCode=' + $scope.item.FCode,
        }).then(function successCallback(response) {
            if (response.data == null || response.data == [] || response.data == '' || response.data == undefined)
                toastr.success('Có thể sử dụng mã này!', 'Thông báo');
            else {
                toastr.error('Mã này đã sử dụng!', 'Thông báo');
                $scope.item.FCode = ''
            }
        }, function errorCallback(response) {
            //$scope.itemError = response.data;
            toastr.error('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });

    }

    if ($scope.item != null && $scope.item != '') $scope.read = true;
    else {
        $scope.item = {};
        $scope.read = false;
    }

});

angular.module('WebApiApp').controller('DMLoaiHinh_DNController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

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
                url: 'api/DMLoaiHinh_DN/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiHinh_DN();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiHinh_DN = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiHinh_DN/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLoaiHinh_DN = response.data.data;
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
                $rootScope.LoadDMLoaiHinh_DN();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiHinh_DN();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();

    });

}]);