angular.module('WebApiApp').controller('GalleryNewsController', ['$q', '$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($q, $rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        $scope.Paging = {
            PageSize: 20,
            PageNumber: 1,
            Total: 0,
            SearchKey: '',
            AlbumId: null,
            FileCount: 0,
            List: [],
            Author: ''
        }
        $scope.GetListBanner();
        $('input[type=file]').change(function () {
            $scope.Paging.FileCount = this.files.length;
            $scope.$apply();
        })
    });
    $scope.UploadGallery = function () {
        var files = document.getElementById('myfile').files;

        if (files.length > 0) {
            debugger;
            $scope.UploadToServer(files).then(dt => {
                document.getElementById('myfile').value = "";
                $scope.Paging.FileCount = 0;
                toastr.success('Tải hình ảnh lên thành công !', 'Thông báo');
            })
        }
        else
            alert('Vui lòng chọn hình ảnh để tải lên!')
    }
    $scope.UploadToServer = function (files) {
        var def = $q.defer();
        debugger;
        angular.forEach(files, function (obj) {
            if (obj.type == "image/jpeg" || obj.type == "image/jpeg" || obj.type == "image/gif") {
                debugger;
                var item = {
                    GroupLinks: null,
                    FName: 'IMG' + Math.floor(Math.random() * 1000000) + '_' + moment().format("DDMMYYYY")
                };
                data = new FormData();
                data.append("file", obj);
                $http({
                    method: 'POST',
                    url: '/CMS_Categories/UploadImage',
                    data: data,
                    headers: {
                        "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                        'Content-type': undefined
                    }
                }).then(function successCallback(response) {
                    item.Image = response.data;
                    item.FDescription = 'TNV'
                    $scope.SaveGallery(item);
                    def.resolve(item);
                }, function errorCallback(response) {

                });
            }
        })
        return def.promise;
    }
    $scope.SaveGallery = function (item) {
        $http({
            method: 'POST',
            url: '/api/CMS_Gallery',
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
    $scope.pageChanged = function () {
        $scope.GetListBanner(false);
    };
    $scope.GetListBanner = function (refresh) {
        if (refresh) {
            $scope.Paging.PageNumber = 1;
        }
        $http({
            method: 'GET',
            url: '/api/CMS_Gallery/TNV',
            params: { pageNumber: $scope.Paging.PageNumber, pageSize: $scope.Paging.PageSize }
        }).then(function successCallback(response) {

            $scope.Paging.List = response.data.list;
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
        return "Hiển thị " + start + " đến " + end + " của " + totalItems + " hình ảnh";
        //return start + '-' + end + ' of ' + totalItems + ' items'
    }
    $scope.Delete = function (id) {
        if (confirm('Bản ghi này sẽ bị xóa, bạn có muốn thực hiện thao tác này?')) {
            $http({
                method: 'DELETE',
                url: '/api/CMS_Gallery/Delete',
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
        if (title.length > 15) {
            var text = angular.copy(title);
            text = text.substring(0, 15) + "...";
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

    $scope.LoadAuthor = function () {
        $http({
            method: 'GET',
            url: '/api/CMS_Author/GetAll',
            //params: { pageNumber: $scope.Paging.PageNumber, pageSize: $scope.Paging.PageSize, searchKey: $scope.Paging.SearchKey }
        }).then(function successCallback(response) {
            $scope.ListAuthor = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
}]);