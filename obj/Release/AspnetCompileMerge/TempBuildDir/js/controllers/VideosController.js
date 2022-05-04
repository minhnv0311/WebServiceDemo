angular.module('WebApiApp').controller('VideosController', ['$q','$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($q,$rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        $scope.Paging = {
            PageSize: 20,
            PageNumber: 1,
            Total: 0,
            SearchKey: '',
            AlbumId: null,
            FileCount: 0,
            List: []
        }
        $scope.LoadGroupLinks('video');
    });
    $scope.LoadGroupLinks = function (type) {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: '/api/CMS_GroupLinks/GetList',
            params: { type: type }
        }).then(function successCallback(response) {
            $scope.GroupLinks = response.data;
            def.resolve($scope.GroupLinks);
        }, function errorCallback(response) {
            def.reject($scope.GroupLinks);
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
        return def.promise;
    }
    $scope.ChoiceAlbum = function (id) {
        $scope.Paging.AlbumId = angular.copy(id);
        $scope.GetListBanner(true)
    }
    $scope.pageChanged = function () {
        $scope.GetListBanner(false);
    };
    $scope.SaveGallery = function (item) {
        $http({
            method: 'POST',
            url: '/api/CMS_Video',
            data: item
        }).then(function successCallback(response) {
            if (item.Id != 0)
                $scope.GetListBanner(false);
            else
                $scope.GetListBanner(true);
            item.itemError = null;
        }, function errorCallback(response) {
            item.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    $scope.GetListBanner = function (refresh) {
        if (refresh) {
            $scope.Paging.PageNumber = 1;
        }
        $http({
            method: 'GET',
            url: '/api/CMS_Video',
            params: { pageNumber: $scope.Paging.PageNumber, pageSize: $scope.Paging.PageSize, searchKey: $scope.Paging.SearchKey, groupId: $scope.Paging.AlbumId}
        }).then(function successCallback(response) {

            $scope.Paging.List = response.data.list;
            $scope.Paging.Total = response.data.total;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
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
        return "Hiển thị " + start + " đến " + end + " của " + totalItems + " video";
    }
    //$scope.ShowGroupName = function (id) {
    //    if ($scope.GroupLinks != null) {
    //        if (id != null && id != '') {
    //            id = parseInt(id);
    //            var o = $scope.GroupLinks.find(x => x.Id == id);
    //            if (o != null) return o.FName;
    //            else return '';
    //        }

    //    }
    //    return '';
    //}
    $scope.Delete = function (id) {
        if (confirm('Bản ghi này sẽ bị xóa, bạn có muốn thực hiện thao tác này?')) {
            $http({
                method: 'DELETE',
                url: '/api/CMS_Video/Delete',
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
    $scope.dynamicPopover = {
        templateUrl: 'myPopoverTemplate.html',
    };
    $scope.DisplayTitle = function (title) {
        if (title.length > 40) {
            var text = angular.copy(title);
            text = text.substring(0, 40) + "...";
            return text;
        } else return title
    }
    $scope.DisplayTitleAlbum = function (title) {
        if (title.length > 15) {
            var text = angular.copy(title);
            text = text.substring(0, 15) + "...";
            return text;
        } else return title
    }
}]);