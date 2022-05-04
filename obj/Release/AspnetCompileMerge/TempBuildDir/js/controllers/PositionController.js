angular.module('WebApiApp').controller("ModelPositionHandlerController", function ($rootScope,$scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.itemUser;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        if (typeof $scope.item.Id == 'undefined' || $scope.item.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/Positions',
                data: $scope.item
            }).then(function successCallback(response) {
                $rootScope.LoadAreas();
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');

                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPositionError = response.data;
                $scope.LoadError($scope.itemPositionError.ModelState);
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/Positions/' + $scope.item.Id,
                data: $scope.item
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.item.Id + ' !', 'Thông báo');
                $rootScope.LoadAreas();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPositionError = response.data;
                $scope.LoadError($scope.itemPositionError.ModelState);
            });
        }

    }

    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidPosition/' + FCode,
        }).then(function successCallback(response) {

            if (response.data != 'undefined') {
                $scope.item = response.data;
                toastr.warning('Mã này đã tồn tại !', 'Thông báo');
            }
            else {

                $scope.item.Id = 0;
                $scope.item.FName = null;
                $scope.item.FDescription = null;
                toastr.success('Có thể sử dụng mã này !', 'Thông báo');
            }
        }, function errorCallback(response) {
        });
    }
    if ($scope.item != '') $scope.read = true;
    else {
        $scope.item = {};
        $scope.read = false;
    }

});


/* Setup blank page controller */
angular.module('WebApiApp').controller('PositionController', ['$stateParams', '$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($stateParams,$rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {

    //$scope.openEditAreaModal = function (itemArea) {

    //    $scope.modalInstance = $uibModal.open({
    //        ariaLabelledBy: 'modal-title',
    //        animation: true,
    //        ariaDescribedBy: 'modal-body',
    //        templateUrl: 'views-client/template/EditArea.html?bust=' + Math.random().toString(36).slice(2),
    //        controller: 'ModelAreasHandlerController',
    //        controllerAs: 'vm',
    //        scope: $scope,
    //        size: 'lg',
    //        resolve: {
    //            itemArea: function () { return itemArea }
    //        }
    //    });
    //}


    $scope.DeletePhone = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/Positions/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadAreas();
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
            $rootScope.LoadAreas();
        }

    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $rootScope.LoadAreas();
        }

    }
    $rootScope.LoadAreas = function () {

        if ($scope.Paging.currentPage == '') return;
        if ($scope.Paging.currentPage == 0 || $scope.Paging.currentPage > $scope.Paging.totalPage)
            $scope.Paging.currentPage = 1;
        $scope.loading = true;
        $http({
            method: 'GET',
            url: '/api/Positions?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.Areas = response.data.Positions;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
            $scope.loading = false;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu điện thoại!', 'Thông báo');
        });
    }
    //$rootScope.MenuFCode = $stateParams.param.FCode;
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
        $rootScope.LoadAreas();
       // $scope.LoadType();
       // $scope.$state.current.data.pageTitle = "Quản lý danh mục điện thoại";

       

    });



}]);
