angular.module('WebApiApp').controller('PhiDKController', ['$q', '$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', '$timeout', function ($q, $rootScope, $scope, $http, $cookies, $uibModal, $settings, $timeout) {
    $scope.$on('$viewContentLoaded', function () {
        $scope.Paging = {
            PageSize: 20,
            PageNumber: 1,
            Total: 0,
            SearchKey: ''
        }
        $scope.GetListBanner();
        $rootScope.LoadDanhSachDangKyNhom();
    });
    $scope.GetListBanner = function (refresh) {
        if (refresh) {
            $scope.Paging.PageNumber = 1;
        }
        $http({
            method: 'GET',
            url: '/api/CMS_DanhMucPhiDK/GetList',
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
    $scope.ShowGroupName = function (id) {
        if ($scope.GroupLinks != null) {
            if (id != null && id != '') {
                id = parseInt(id);
                var o = $scope.GroupLinks.find(x => x.Id == id);
                if (o != null) return o.FName;
                else return '';
            }

        }
        return '';
    }
    $scope.Delete = function (id) {
        if (confirm('Bản ghi này sẽ bị xóa, bạn có muốn thực hiện thao tác này?')) {
            $http({
                method: 'DELETE',
                url: '/api/CMS_DanhMucPhiDK/Delete',
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
    //Nam viết thêm
    $scope.IsShowPage_DangKyCaNhan = true;
    $scope.IsShowPage_DangKyNhom = false;

    $scope.Paging_DKNhom = {
        SearchKey: '',
        pageSize: 15,
        pageStart: 0,
        pageEnd: 0,
        totalCount: 0,
        totalPage: 0,
        currentPage: 1
    };
    $rootScope.LoadDanhSachDangKyNhom = function () {
        $http({
            method: 'GET',
            url: 'api/CMS_DanhMucPhiDK/LoadDanhSachDangKyNhom?SearchKey=' + $scope.Paging_DKNhom.SearchKey +
                '&pageSize=' + $scope.Paging_DKNhom.pageSize + '&pageNumber=' + $scope.Paging_DKNhom.currentPage
        }).then(function successCallback(response) {
            $scope.lstDanhSach = response.data.apartData;

            $scope.Paging_DKNhom.totalCount = response.data.totalCount;
            $scope.Paging_DKNhom.pageStart = response.data.pageStart;
            $scope.Paging_DKNhom.pageEnd = response.data.pageEnd;
            $scope.Paging_DKNhom.totalPage = response.data.totalPage;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi xảy ra trong quá trình load danh sách phí đăng ký theo nhóm', 'Thông báo');
        });
    };

    $scope.OpenModalDangKyNhom = function (item, type) {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/Modal/ModalDangKyNhom.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelDangKyNhomHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item },
                type: function () { return type }
            }
        });
    }

    $scope.DeleteDKNhom = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa?')) {
            $http({
                method: 'DELETE',
                url: 'api/CMS_DanhMucPhiDK/DeleteDKNhom?Id=' + Id
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công', 'Thông báo');
                $rootScope.LoadDanhSachDangKyNhom();
            }, function errorCallback(response) {
                toastr.warning('Có lỗi xảy ra trong quá trình xóa dữ liệu', 'Thông báo');
            });
        }
    };
}]);
angular.module('WebApiApp').controller('ModelDangKyNhomHandlerController', function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = ($scope.$resolve.item != undefined) ? $scope.$resolve.item : {};
    $scope.type = $scope.$resolve.type;

    $scope.OnLoad = function () {

    };

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_DanhMucPhiDK/UpdateDangKyNhom',
            data: $scope.item
        }).then(function successCallback(response) {
            toastr.success('Cập nhật dữ liệu thành công', 'Thông báo');
            $uibModalInstance.close('save');
            $rootScope.LoadDanhSachDangKyNhom();
        }, function errorCallback(response) {
            toastr.warning('Có lỗi xảy ra trong quá trình load danh sách', 'Thông báo');
        });
    };

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };
});