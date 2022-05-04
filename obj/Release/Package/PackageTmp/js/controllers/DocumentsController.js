angular.module('WebApiApp').controller('DocumentsController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        $scope.Paging = {
            PageSize: 20,
            PageNumber: 1,
            Total: 0,
            SearchKey: ''
        }
        $scope.GetListBanner();
    });
    $scope.GetListBanner = function (refresh) {
        if (refresh) {
            $scope.Paging.PageNumber = 1;
        }
        $http({
            method: 'GET',
            url: '/api/CMS_Documents',
            params: { pageNumber: $scope.Paging.PageNumber, pageSize: $scope.Paging.PageSize, searchKey: $scope.Paging.SearchKey }
        }).then(function successCallback(response) {

            $scope.List = response.data.list;
            $scope.Paging.Total = response.data.total;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.pageChanged = function () {
        $scope.GetListBanner(false);
    };
    $scope.DisplayInfoPagination = function (page, itemsPerPage, totalItems) {
        start = (page - 1) * itemsPerPage + 1
        end = totalItems

        if (itemsPerPage < totalItems) {
            end = itemsPerPage * page
            if (end > totalItems) {
                end = totalItems;
            }
        }

        // e.g. "21-30 of 193 items"
        return "Hiển thị " + start + " đến " + end + " của " + totalItems + " bản ghi";
        //return start + '-' + end + ' of ' + totalItems + ' items'
    }

    $scope.Delete = function (id) {
        if (confirm('Bản ghi này sẽ bị xóa, bạn có muốn thực hiện thao tác này?')) {
            $http({
                method: 'DELETE',
                url: '/api/CMS_Documents/Delete',
                params: { id: id }
            }).then(function successCallback(response) {
                if (response.data == "SUCCESS")
                    $scope.GetListBanner(false);
                toastr.warning('Xóa dữ liệu thành công !', 'Thông báo');
            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
            });
        }
    }
}]);