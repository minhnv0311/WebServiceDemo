angular.module('WebApiApp').controller('QLPhongLuuTruController',
    ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings',
        function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

            $scope.Paging = {
                "searchKey": '',
                "pageSize": 15,
                "totalCount": 0,
                "totalPage": 0,
                "currentPage": 1
            };

            $scope.filter = {
                PageNumber: $scope.Paging.currentPage,
                PageSize: $scope.Paging.pageSize
            };
            var api = {
                delete: 'api/quanly/phongluutru/del',
                getdata: 'api/quanly/phongluutru/get',
                search: 'api/quanly/phongluutru/search',
                getloaiphong: 'api/dmloaiphong/get',
                getdonviluunop: 'api/DMDonViNopLuu/Get',
                getnhomvbchuyeu: 'api/DMNhomVBChuYeu/Get'
            };

            var loaiPhong = function () {
                $http({
                    method: 'GET',
                    url: api.getloaiphong + '?pageNumber=1&pageSize=999&searchKey='
                }).then(function successCallback(response) {
                    $scope.DMLoaiPhong = response.data.data;

                }, function errorCallback(response) {
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
                });

                $scope.cancelModal = function () {
                    $uibModalInstance.dismiss('close');
                };
            };
            loaiPhong();

            $scope.DataHeader = [
                {
                    Name: "Phông số",
                    Key: 'PhongSo'
                },
                {
                    Name: "Tên phông",
                    Key: 'TenPhongLuuTru'
                },
                {
                    Name: "Loại phông",
                    Key: 'LoaiPhongTen'
                },
                {
                    Name: "Ngày tạo phông",
                    Key: 'NgayTaoPhong'
                }
            ];

            $scope.Del = function (Id) {
                if (confirm('Bạn có chắc chắn muốn xóa ?'))
                    $http({
                        method: 'GET',
                        url: api.delete + '/' + Id
                    }).then(function successCallback(response) {
                        toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                        $rootScope.LoadData();
                    }, function errorCallback(response) {
                        //$scope.itemError = response.data;
                        toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
                    });

            };

            $rootScope.LoadData = function () {
                $http({
                    method: 'POST',
                    url: api.search,
                    data: $scope.filter
                }).then(function successCallback(response) {
                    $scope.DataItems = response.data.data;
                    $scope.Paging.totalCount = response.data.totalCount;
                    $scope.Paging.pageStart = response.data.pageStart;
                    $scope.Paging.totalPage = response.data.totalPage;
                    $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage);
                    $('#show_paginator').bootpag({
                        total: $scope.Paging.totalPage,
                        page: $scope.Paging.currentPage,
                        maxVisible: 10
                    }).on('page', function (event, num) {
                        $scope.Paging.currentPage = num;
                        $rootScope.LoadData();
                        if (num === null) num = 1;
                    });

                }, function errorCallback(response) {
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
                });
            };

            $scope.LoadData();
            $scope.$on('$viewContentLoaded', function () {
                ComponentsSelect2.init();
            });

            $scope.onCancel = function () {
                $scope.filter = {};
            };


            $scope.onSearch = function () {
                $rootScope.LoadData();
            };
        }]);
