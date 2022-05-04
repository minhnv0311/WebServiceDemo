angular.module('WebApiApp').controller("ModelTypeCateHandlerController", function ($scope, $http, $uibModalInstance) {
    $scope.itemType = $scope.$resolve.itemType;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        if (typeof $scope.itemType == 'undefined') {
            $scope.itemType = {};

        }
        if (typeof $scope.itemType.Id == 'undefined') {
            $http({
                method: 'POST',
                url: '/api/Types',
                data: $scope.itemType
            }).then(function successCallback(response) {
                $rootScope.LoadTypes();
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');

                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemTypeError = response.data;
                $scope.LoadError($scope.itemTypeError.ModelState);
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/Types/' + $scope.itemType.Id,
                data: $scope.itemType
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.itemType.Id + ' !', 'Thông báo');
                $rootScope.LoadTypes();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemTypeError = response.data;
                $scope.LoadError($scope.itemTypeError.ModelState);
            });
        }

    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.itemType == 'undefined') {
            $scope.itemType = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidType/' + FCode,
        }).then(function successCallback(response) {

            if (response.data != 'undefined') {
                $scope.itemType = response.data;
                toastr.warning('Mã này đã tồn tại !', 'Thông báo');
            }
            else {

                $scope.itemType.Id = 0;
                $scope.itemType.FName = null;
                $scope.itemType.FDescription = null;
                toastr.success('Có thể sử dụng mã này !', 'Thông báo');
            }
        }, function errorCallback(response) {
        });
    }

    if ($scope.itemType != undefined) $scope.read = true;
    else {
        $scope.itemType = {};
        $scope.read = false;
    }

});


/* Setup blank page controller */
angular.module('WebApiApp').controller('TypeCateController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {

    $scope.openEditModal = function (itemType) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditType.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelTypeCateHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'lg',
            resolve: {
                itemType: function () { return itemType }
            }
        });
    }



    $scope.DeletePhone = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Types/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadTypes();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
    };
    // Lấy danh sách điện thoại,pagination custom
    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "pageStart": 0,
        "pageEnd": 0,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.PrePage = function () {
        if ($scope.Paging.currentPage > 1) {
            $scope.Paging.currentPage = $scope.Paging.currentPage - 1;
            $rootScope.LoadTypes();
        }

    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $rootScope.LoadTypes();
        }

    }
    $rootScope.LoadTypes = function () {

        if ($scope.Paging.currentPage == '') return;
        if ($scope.Paging.currentPage == 0 || $scope.Paging.currentPage > $scope.Paging.totalPage)
            $scope.Paging.currentPage = 1;
        $scope.loading = true;
        $http({
            method: 'GET',
            url: '/api/Types?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.Types = response.data.Types;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu điện thoại!', 'Thông báo');
        });
    }

    //End
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        App.initAjax();

        //UITree.init();
        //// Simple GET request example:
        //// set default layout mode
        $rootScope.$settings.layout.pageContentWhite = true;
        $rootScope.$settings.layout.pageBodySolid = false;
        $rootScope.$settings.layout.pageSidebarClosed = false;
        $rootScope.LoadTypes();
        console.log($scope.Paging);
        //$scope.$state.current.data.pageTitle = "Quản lý danh mục phân loại";

    });



}]);
