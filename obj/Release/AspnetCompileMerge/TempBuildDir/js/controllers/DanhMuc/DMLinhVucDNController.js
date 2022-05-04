angular.module('WebApiApp').controller("ModalDMLinhVucDNHandlerController", function ($cookies,$rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.check = $scope.$resolve.check;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLinhVucDN/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');

            $rootScope.LoadDMLinhVucDN();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLinhVucDN/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');

            $rootScope.LoadDMLinhVucDN();
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
            $scope.itemError = "";
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.ValidFCode = function () {

        $http({
            method: 'GET',
            url: 'api/DMLinhVucDN/ValidFCode?FCode=' + $scope.item.FCode,
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
        $scope.item = {
            Image: '../../../Uploads/Banners/banner-no-image.jpg'
        };
        $scope.read = false;
    }
    $scope.DeleteBanner = function () {
        if ($scope.item.Image != null && $scope.item.Image != '') {
            $scope.item.Image = '../../../Uploads/Banners/banner-no-image.jpg';
        }
    }
    $scope.ShowDeleteButton = function () {
        if ($scope.item.Image != null && $scope.item.Image != '' && $scope.item.Image != '../../../Uploads/Banners/banner-no-image.jpg')
            return true;
        else return false;
    }
    $scope.UploadBanner = function () {
        var files = document.getElementById('file').files;
        if (files.length > 0) {
            data = new FormData();
            data.append("file", files[0]);
            $http({
                method: 'POST',
                url: '/CMS_Categories/UploadBanner',
                data: data,
                headers: {
                    "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                    'Content-type': undefined
                }
            }).then(function successCallback(response) {
                $scope.item.Image = response.data;
            }, function errorCallback(response) {

            });
        }
        else
            alert('Vui lòng chọn hình ảnh để tải lên!')
    }
});

angular.module('WebApiApp').controller('DMLinhVucDNController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

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
                url: 'api/DMLinhVucDN/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLinhVucDN();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLinhVucDN = function () {

        $http({
            method: 'GET',
            url: 'api/DMLinhVucDN/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLinhVucDN = response.data.data;
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
                $rootScope.LoadDMLinhVucDN();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLinhVucDN();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();

    });

}]);