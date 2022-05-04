angular.module('WebApiApp').controller('QLHoSoPhapLyController',
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
                delete: 'api/quanly/hosophaply/del',
                getdata: 'api/quanly/hosophaply/get',
                search: 'api/quanly/hosophaply/search',
                getphong: 'api/quanly/phongluutru/get',
                getdonviluunop: 'api/DMDonViNopLuu/Get',
                getnhomvbchuyeu: 'api/DMNhomVBChuYeu/Get'
            };

            $scope.DMTrangThai = [
                { Id: '0', FName: 'Đang chờ tiếp nhận' },
                { Id: '1', FName: 'Đã tiếp nhận' }];

            var getPhong = function () {
                $http({
                    method: 'GET',
                    url: api.getphong + '?pageNumber=1&pageSize=999&searchKey='
                }).then(function successCallback(response) {
                    $scope.DMLoaiPhong = response.data.data;

                }, function errorCallback(response) {
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
                });

                $scope.cancelModal = function () {
                    $uibModalInstance.dismiss('close');
                };
            };
            getPhong();

            $scope.DataHeader = [
                {
                    Name: "Tên kế hoạch"
                },
                {
                    Name: "Ngày tạo"
                },
                {
                    Name: "Địa điểm kiểm tra"
                },
                {
                    Name: "Địa điểm tiếp nhận"
                },
                {
                    Name: "Thời gian giao nộp"
                },
                {
                    Name: "Tổng số hồ sơ"
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