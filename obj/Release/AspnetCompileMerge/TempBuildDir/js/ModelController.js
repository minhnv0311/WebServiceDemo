angular.module('WebApiApp').controller("ModalDMLoaiVanBanHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    };


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiVanBan/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiVanBan", {});
            $rootScope.LoadDMLoaiVanBan();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiVanBan/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiVanBan", {});
            $rootScope.LoadDMLoaiVanBan();
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
            url: 'api/DMLoaiVanBan/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMLoaiHinhVanBanHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiHinhVanBan/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiHinhVanBan", {});
            $rootScope.LoadDMLoaiHinhVanBan();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiHinhVanBan/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiHinhVanBan", {});
            $rootScope.LoadDMLoaiHinhVanBan();
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
            url: 'api/DMLoaiHinhVanBan/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMVatMangTinHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMVatMangTin/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMVatMangTin", {});
            $rootScope.LoadDMVatMangTin();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMVatMangTin/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMVatMangTin", {});
            $rootScope.LoadDMVatMangTin();
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
            url: 'api/DMVatMangTin/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMNgonNguHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {



    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMNgonNgu/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMNgonNgu", {});
            $rootScope.LoadDMNgonNgu();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMNgonNgu/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMNgonNgu", {});
            $rootScope.LoadDMNgonNgu();
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
            url: 'api/DMNgonNgu/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMGiaTriDacBietHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMGiaTriDacBiet/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMGiaTriDacBiet", {});
            $rootScope.LoadDMGiaTriDacBiet();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMGiaTriDacBiet/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMGiaTriDacBiet", {});
            $rootScope.LoadDMGiaTriDacBiet();
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
            url: 'api/DMGiaTriDacBiet/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMLoaiBangDiaHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiBangDia/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiBangDia", {});
            $rootScope.LoadDMLoaiBangDia();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiBangDia/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiBangDia", {});
            $rootScope.LoadDMLoaiBangDia();
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
            url: 'api/DMLoaiBangDia/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMLoaiGhiAmHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiGhiAm/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiGhiAm", {});
            $rootScope.LoadDMLoaiGhiAm();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiGhiAm/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiGhiAm", {});
            $rootScope.LoadDMLoaiGhiAm();
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
            url: 'api/DMLoaiGhiAm/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMThoiHanBaoQuanHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMThoiHanBaoQuan/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMThoiHanBaoQuan", {});
            $rootScope.LoadDMThoiHanBaoQuan();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMThoiHanBaoQuan/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMThoiHanBaoQuan", {});
            $rootScope.LoadDMThoiHanBaoQuan();
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
            url: 'api/DMThoiHanBaoQuan/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMLoaiAnhHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiAnh/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiAnh", {});
            $rootScope.LoadDMLoaiAnh();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiAnh/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiAnh", {});
            $rootScope.LoadDMLoaiAnh();
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
            url: 'api/DMLoaiAnh/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMMucDoMatHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMMucDoMat/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMMucDoMat", {});
            $rootScope.LoadDMMucDoMat();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMMucDoMat/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMMucDoMat", {});
            $rootScope.LoadDMMucDoMat();
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
            url: 'api/DMMucDoMat/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMDoChinhXacAnhHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMDoChinhXacAnh/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMDoChinhXacAnh", {});
            $rootScope.LoadDMDoChinhXacAnh();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMDoChinhXacAnh/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMDoChinhXacAnh", {});
            $rootScope.LoadDMDoChinhXacAnh();
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
            url: 'api/DMDoChinhXacAnh/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMLoaiPhimHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiPhim/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiPhim", {});
            $rootScope.LoadDMLoaiPhim();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiPhim/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiPhim", {});
            $rootScope.LoadDMLoaiPhim();
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
            url: 'api/DMLoaiPhim/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMLinhVucHoatDongHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLinhVucHoatDong/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLinhVucHoatDong", {});
            $rootScope.LoadDMLinhVucHoatDong();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLinhVucHoatDong/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLinhVucHoatDong", {});
            $rootScope.LoadDMLinhVucHoatDong();
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
            url: 'api/DMLinhVucHoatDong/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMMucDoTinCayHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMMucDoTinCay/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMMucDoTinCay", {});
            $rootScope.LoadDMMucDoTinCay();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMMucDoTinCay/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMMucDoTinCay", {});
            $rootScope.LoadDMMucDoTinCay();
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
            url: 'api/DMMucDoTinCay/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMTinhTrangVatLyHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMTinhTrangVatLy/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMTinhTrangVatLy", {});
            $rootScope.LoadDMTinhTrangVatLy();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMTinhTrangVatLy/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMTinhTrangVatLy", {});
            $rootScope.LoadDMTinhTrangVatLy();
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
            url: 'api/DMTinhTrangVatLy/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMTenLoaiHoSoHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMTenLoaiHoSo/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMTenLoaiHoSo", {});
            $rootScope.LoadDMTenLoaiHoSo();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMTenLoaiHoSo/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMTenLoaiHoSo", {});
            $rootScope.LoadDMTenLoaiHoSo();
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
            url: 'api/DMTenLoaiHoSo/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMDoiTuongKhaiThacHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMDoiTuongKhaiThac/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMDoiTuongKhaiThac", {});
            $rootScope.LoadDMDoiTuongKhaiThac();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMDoiTuongKhaiThac/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMDoiTuongKhaiThac", {});
            $rootScope.LoadDMDoiTuongKhaiThac();
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
            url: 'api/DMDoiTuongKhaiThac/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMTenLoaiVanBanHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMTenLoaiVanBan/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMTenLoaiVanBan", {});
            $rootScope.LoadDMTenLoaiVanBan();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMTenLoaiVanBan/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMTenLoaiVanBan", {});
            $rootScope.LoadDMTenLoaiVanBan();
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
            url: 'api/DMTenLoaiVanBan/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMHinhThucKhaiThacHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMHinhThucKhaiThac/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMHinhThucKhaiThac", {});
            $rootScope.LoadDMHinhThucKhaiThac();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMHinhThucKhaiThac/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMHinhThucKhaiThac", {});
            $rootScope.LoadDMHinhThucKhaiThac();
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
            url: 'api/DMHinhThucKhaiThac/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMDonViNopLuuHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMDonViNopLuu/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMDonViNopLuu", {});
            $rootScope.LoadDMDonViNopLuu();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMDonViNopLuu/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMDonViNopLuu", {});
            $rootScope.LoadDMDonViNopLuu();
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
            url: 'api/DMDonViNopLuu/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMLoaiPhongHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiPhong/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiPhong", {});
            $rootScope.LoadDMLoaiPhong();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMLoaiPhong/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMLoaiPhong", {});
            $rootScope.LoadDMLoaiPhong();
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
            url: 'api/DMLoaiPhong/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMNguoiKyHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMNguoiKy/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMNguoiKy", {});
            $rootScope.LoadDMNguoiKy();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMNguoiKy/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMNguoiKy", {});
            $rootScope.LoadDMNguoiKy();
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
            url: 'api/DMNguoiKy/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMCoQuanBanHanhHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMCoQuanBanHanh/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMCoQuanBanHanh", {});
            $rootScope.LoadDMCoQuanBanHanh();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMCoQuanBanHanh/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMCoQuanBanHanh", {});
            $rootScope.LoadDMCoQuanBanHanh();
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
            url: 'api/DMCoQuanBanHanh/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMMucDichKhaiThacHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMMucDichKhaiThac/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMMucDichKhaiThac", {});
            $rootScope.LoadDMMucDichKhaiThac();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMMucDichKhaiThac/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMMucDichKhaiThac", {});
            $rootScope.LoadDMMucDichKhaiThac();
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
            url: 'api/DMMucDichKhaiThac/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalDMNhomVBChuYeuHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: 'api/DMNhomVBChuYeu/Save',
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMNhomVBChuYeu", {});
            $rootScope.LoadDMNhomVBChuYeu();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    }
    $scope.SaveAndNew = function () {

        $http({
            method: 'POST',
            url: 'api/DMNhomVBChuYeu/Save',
            data: $scope.item
        }).then(function successCallback(response) {

            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadDMNhomVBChuYeu", {});
            $rootScope.LoadDMNhomVBChuYeu();
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
            url: 'api/DMNhomVBChuYeu/ValidFCode?FCode=' + $scope.item.FCode,
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
angular.module('WebApiApp').controller("ModalQLPhongLuuTruHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    if ($scope.item != undefined && $scope.item != '') {
        $scope.item.DonViNopLuuItem = {
            Id: $scope.item.DonViNopLuuId,
            FName: $scope.item.TenDonViNopLuu,
        };

        $scope.item.LoaiPhongItem = {
            Id: $scope.item.LoaiPhongId,
            FName: $scope.item.TenLoaiPhong
        };
    }

    var api = {
        save: 'api/quanly/phongluutru/save',
        del: 'api/quanly/phongluutru/del',
        getitem: 'api/quanly/phongluutru/item/',
        getloaiphong: 'api/dmloaiphong/get',
        getdonviluunop: 'api/DMDonViNopLuu/Get',
        getnhomvbchuyeu: 'api/DMNhomVBChuYeu/Get'
    };

    var initSave = function () {
        if ($scope.item.DonViNopLuuItem)
            $scope.item.DonViNopLuuId = $scope.item.DonViNopLuuItem.Id;
        if ($scope.item.LoaiPhongItem)
            $scope.item.LoaiPhongId = $scope.item.LoaiPhongItem.Id;

        $scope.item.ThoiGianVanBanTuNgay = $rootScope.toDateTime($scope.item.ThoiGianVanBanTuNgayVN);
        $scope.item.ThoiGianPhongDenNgay = $rootScope.toDateTime($scope.item.ThoiGianPhongDenNgayVN);
        $scope.item.ThoiGianPhongTuNgay = $rootScope.toDateTime($scope.item.ThoiGianPhongTuNgayVN);
        $scope.item.ThoiGianVanBanDenNgay = $rootScope.toDateTime($scope.item.ThoiGianVanBanDenNgayVN);

    };

    $scope.SaveModal = function () {
        initSave();

        if ($scope.item.DonViNopLuuItem)
            $scope.item.DonViNopLuuId = $scope.item.DonViNopLuuItem.Id;
        if ($scope.item.LoaiPhongItem)
            $scope.item.LoaiPhongId = $scope.item.LoaiPhongItem.Id;
        $http({
            method: 'POST',
            url: api.save,
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadData", {});
            $rootScope.LoadData();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });
    };

    $scope.SaveAndNew = function () {
        initSave();

        $http({
            method: 'POST',
            url: api.save,
            data: $scope.item
        }).then(function successCallback(response) {
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadData", {});
            $rootScope.LoadData();
            $scope.item = '';
            $scope.itemError = "";
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    };

    var donViLuuNop = function () {
        $http({
            method: 'GET',
            url: api.getdonviluunop + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMDonViLuuNop = response.data.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
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

    var nhomVBChuYeu = function () {
        $http({
            method: 'GET',
            url: api.getnhomvbchuyeu + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMNhomVanBanChuYeu = response.data.data;

            angular.forEach($scope.DMNhomVanBanChuYeu, function (value, key) {
                value.checked = false;
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    $scope.getCheckNhomVB = function (value) {
        return $scope.item.CacNhomVanBanChuYeuId.indexOf(value) >= 0;
    };

    $scope.onCheckNhomVB = function (item) {
        item.checked = !item.checked;
        $scope.item.CacNhomVanBanChuYeuId = '';

        angular.forEach($scope.DMNhomVanBanChuYeu, function (value, key) {
            if (value.checked)
                $scope.item.CacNhomVanBanChuYeuId += ',' + value.FCode;
        });

        if ($scope.item.CacNhomVanBanChuYeuId.length > 1) {
            $scope.item.CacNhomVanBanChuYeuId = $scope.item.CacNhomVanBanChuYeuId.substring(1, $scope.item.CacNhomVanBanChuYeuId.length);
        }
    };

    $scope.OnLoad = function () {
        donViLuuNop();
        loaiPhong();
        nhomVBChuYeu();
    };


    if ($scope.item != null && $scope.item != '') $scope.read = true;
    else {
        $scope.item = {};
        $scope.read = false;
    }
});
angular.module('WebApiApp').controller("ModalQLHoSoPhapLyHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;


    $scope.DMTrangThai = [
        { Id: '0', FName: 'Đang chờ tiếp nhận' },
        { Id: '1', FName: 'Đã tiếp nhận' }];

    if ($scope.item != undefined && $scope.item != '') {
        $scope.item.PhongItem = {
            Id: $scope.item.PhongId,
            FName: $scope.item.TenPhong
        };

        $scope.item.TrangThaiItem = $scope.DMTrangThai[parseInt($scope.item.TrangThai)];
    }

    $scope.GiaiDoanDataItems = [];

    var api = {
        save: 'api/quanly/hosophaply/save',
        del: 'api/quanly/hosophaply/del',
        getitem: 'api/quanly/phongluutru/item/',
        getphong: 'api/quanly/phongluutru/get',
        getdonviluunop: 'api/DMDonViNopLuu/Get',
        getnhomvbchuyeu: 'api/DMNhomVBChuYeu/Get',
        getgiaidoan: 'api/quanly/hosophaply/giaidoan/'
    };

    $scope.DataHeader = [
        {
            Name: "Tên giai đoạn"
        },
        {
            Name: "Tổng số hồ sơ"
        },
        {
            Name: "Tổng số văn bản"
        }
    ];


    $scope.onSaveGiaiDoan = function () {
        var itemId = 1;
        angular.forEach($scope.GiaiDoanDataItems, function (value, key) {
            if (value.Id > itemId) {
                itemId = value.Id;
            }
        });

        var item = {
            Id: (itemId + 1),
            TenGiaiDoan: $scope.item.TenGiaiDoan,
            TongSoHoSo: $scope.item.TongSoHoSo,
            TongSoVanBan: $scope.item.TongSoVanBan
        };

        $scope.item.TenGiaiDoan = '';
        $scope.item.TongSoHoSo = '';
        $scope.item.TongSoVanBan = '';

        $scope.GiaiDoanDataItems.push(item);
    };

    $scope.onDelGiaiDoan = function (id) {
        angular.forEach($scope.GiaiDoanDataItems, function (value, key) {
            if (value.Id == id) {
                $scope.GiaiDoanDataItems.splice(key, 1);
            }
        });
    };

    var initSave = function () {
        if ($scope.item.PhongItem)
            $scope.item.PhongId = $scope.item.PhongItem.Id;
        if ($scope.item.TrangThaiItem)
            $scope.item.TrangThai = $scope.item.TrangThaiItem.Id;
        $scope.item.HoSoPhapLyGiaiDoan = $scope.GiaiDoanDataItems;

        $scope.item.KiemDemTuNgay = $rootScope.toDateTime($scope.item.KiemDemTuNgayVN);
        $scope.item.KiemDemDenNgay = $rootScope.toDateTime($scope.item.KiemDemDenNgayVN);
        $scope.item.GiaoNopDenNgay = $rootScope.toDateTime($scope.item.GiaoNopDenNgayVN);
        $scope.item.GiaoNopTuNgay = $rootScope.toDateTime($scope.item.GiaoNopTuNgayVN);
    };


    $scope.SaveModal = function () {
        initSave();

        $http({
            method: 'POST',
            url: api.save,
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadData", {});
            $rootScope.LoadData();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });
    };

    $scope.SaveAndNew = function () {
        initSave();

        $http({
            method: 'POST',
            url: api.save,
            data: $scope.item
        }).then(function successCallback(response) {
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadData", {});
            $rootScope.LoadData();
            $scope.item = '';
            $scope.itemError = "";
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    };


    var getPhong = function () {
        $http({
            method: 'GET',
            url: api.getphong + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMPhong = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getGiaiDoan = function () {
        if ($scope.item != '' && $scope.item != null && $scope.item.Id) {
            $http({
                method: 'GET',
                url: api.getgiaidoan + $scope.item.Id
            }).then(function successCallback(response) {
                $scope.GiaiDoanDataItems = response.data;

            }, function errorCallback(response) {
                toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
            });

            $scope.cancelModal = function () {
                $uibModalInstance.dismiss('close');
            };
        }
    };


    $scope.OnLoad = function () {
        getPhong();
        getGiaiDoan();
    };


    if ($scope.item != null && $scope.item != '') $scope.read = true;
    else {
        $scope.item = {};
        $scope.read = false;
    }
});

angular.module('WebApiApp').controller("ModalQLNhapHoSoHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.item;
    $scope.type = $scope.$resolve.type;

    $scope.DMTrangThai = [{ Id: '0', FName: 'Đang nhập' }, { Id: '1', FName: 'Hoàn thành nhập' }];

    if ($scope.item != undefined && $scope.item != '') {
        $scope.item.PhongItem = {
            Id: $scope.item.PhongId,
            FName: $scope.item.TenPhong
        };
        $scope.item.TrangThaiCuaHoSoItem = $scope.DMTrangThai[parseInt($scope.item.TrangThai)];
    }

    var api = {
        save: 'api/quanly/hosophaply/save',
        del: 'api/quanly/hosophaply/del',
        getitem: 'api/quanly/phongluutru/item/',
        getphong: 'api/quanly/phongluutru/get',
        getdonviluunop: 'api/DMDonViNopLuu/Get',
        getnhomvbchuyeu: 'api/DMNhomVBChuYeu/Get',
        getloaihoso: 'api/DMTenLoaiHoSo/Get',
        getlinhvuctailieu: 'api/DMLinhVucTaiLieu/Get',
        getthoihanbaoquan: 'api/DMThoiHanBaoQuan/Get',
        gettrangvatly: 'api/DMTinhTrangVatLy/Get',
        getngonngu: 'api/DMNgonNgu/Get',
        getchedosudung: 'api/DMCheDoSuDung/Get',
        gethopso: 'api/DMHopSo/Get',
        getbieumaunhaphoso: 'api/DMBieuMauNhapHoSo/Get',
    };

    var getHopSo = function () {
        $http({
            method: 'GET',
            url: api.gethopso + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMHopSo = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getBieuMauNhapHoSo = function () {
        $http({
            method: 'GET',
            url: api.getbieumaunhaphoso + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMBieuMauNhapHoSo = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getCheDoSuDung = function () {
        $http({
            method: 'GET',
            url: api.getchedosudung + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMCheDoSuDung = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getNgonNgu = function () {
        $http({
            method: 'GET',
            url: api.getngonngu + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMNgonNgu = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getPhong = function () {
        $http({
            method: 'GET',
            url: api.getphong + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMPhong = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getLoaiHoSo = function () {
        $http({
            method: 'GET',
            url: api.getloaihoso + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMLoaiHoSo = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getDonViNopLuu = function () {
        $http({
            method: 'GET',
            url: api.getdonviluunop + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMDonViNopLuu = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getLinhVucTaiLieu = function () {
        $http({
            method: 'GET',
            url: api.getlinhvuctailieu + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMLinhVucTaiLieu = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getThoiHanBaoQuan = function () {
        $http({
            method: 'GET',
            url: api.getthoihanbaoquan + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMThoiHanBaoQuan = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    var getTinhTrangVatLy = function () {
        $http({
            method: 'GET',
            url: api.gettrangvatly + '?pageNumber=1&pageSize=999&searchKey='
        }).then(function successCallback(response) {
            $scope.DMTinhTrangVatLy = response.data.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('close');
        };
    };

    $scope.OnLoad = function () {
        getPhong();
        getLoaiHoSo();
        getDonViNopLuu();
        getLinhVucTaiLieu();
        getThoiHanBaoQuan();
        getTinhTrangVatLy();
        getNgonNgu();
        getCheDoSuDung();
        getHopSo();
        getBieuMauNhapHoSo();
    };

    var initSave = function () {
        if ($scope.item.LoaiHoSoItem)
            $scope.item.LoaiHoSoId = $scope.item.LoaiHoSoItem.Id;
        if ($scope.item.BieuMauNhapHoSoItem)
            $scope.item.BieuMauNhapHoSoId = $scope.item.BieuMauNhapHoSoItem.Id;
        if ($scope.item.DonViNopLuuItem)
            $scope.item.DonViNopLuuId = $scope.item.DonViNopLuuItem.Id;
        if ($scope.item.PhongItem)
            $scope.item.PhongId = $scope.item.PhongItem.Id;
        if ($scope.item.HopSoItem)
            $scope.item.HopSoId = $scope.item.HopSoItem.Id;
        if ($scope.item.TrangThaiCuaHoSoItem)
            $scope.item.TrangThaiCuaHoSoId = $scope.item.TrangThaiCuaHoSoItem.Id;
        if ($scope.item.LinhVucTaiLieuItem)
            $scope.item.LinhVucTaiLieuId = $scope.item.LinhVucTaiLieuItem.Id;
        if ($scope.item.NgonNguItem)
            $scope.item.NgonNguId = $scope.item.NgonNguItem.Id;
        if ($scope.item.ThoiHanBaoQuanItem)
            $scope.item.ThoiHanBaoQuanId = $scope.item.ThoiHanBaoQuanItem.Id;
        if ($scope.item.CheDoSuDungItem)
            $scope.item.CheDoSuDungId = $scope.item.CheDoSuDungItem.Id;
        if ($scope.item.TinhTrangVatLyItem)
            $scope.item.TinhTrangVatLyId = $scope.item.TinhTrangVatLyItem.Id;

        $scope.item.ThoiGianBatDau = $rootScope.toDateTime($scope.item.ThoiGianBatDauVN);
        $scope.item.KetThuc = $rootScope.toDateTime($scope.item.KetThucVN);
    };


    $scope.SaveModal = function () {
        initSave();

        $http({
            method: 'POST',
            url: api.save,
            data: $scope.item
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.itemError = "";
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadData", {});
            $rootScope.LoadData();
            $scope.cancelModal();
        }, function errorCallback(response) {
            $scope.itemError = response.data;

            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });
    };

    $scope.SaveAndNew = function () {
        initSave();

        $http({
            method: 'POST',
            url: api.save,
            data: $scope.item
        }).then(function successCallback(response) {
            toastr.success('Đã lưu dữ liệu thành công !', 'Thông báo');
            //$rootScope.$emit("LoadData", {});
            $rootScope.LoadData();
            $scope.item = '';
            $scope.itemError = "";
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
        });

    };




    if ($scope.item != null && $scope.item != '') $scope.read = true;
    else {
        $scope.item = {};
        $scope.read = false;
    }
});




//---------------------- Hoàn viết -------------------------------------------
angular.module('WebApiApp').controller("ModalBannerHandlerController", function ($rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Banner/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Banner',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
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
    $scope.TypeBanner = [
        {
            "FCode": "TOP",
            "FName": "Banner top",
        },
        {
            "FCode": "ORG",
            "FName": "Logo",
        },
        {
            "FCode": "SYSTEM",
            "FName": "Banner giữa",
        },
        //{
        //    "FCode": "SPONSORS",
        //    "FName": "Nhà tài trợ",
        //},
        {
            "FCode": "INTRO",
            "FName": "Banner cạnh",
        },
    ];
});
angular.module('WebApiApp').controller("ModalLinksHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        $scope.GetDropCMSCategories();
        $scope.LoadGroupLinks('link');
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Links/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
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

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Links',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
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
                url: '/CMS_Categories/UploadImage',
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
angular.module('WebApiApp').controller("ModalCommentHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {
    $scope.item = $scope.$resolve.item;
    $scope.innitModal = function () {
            $http({
                method: 'GET',
                url: '/api/CCM_Home/GetCommentById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data.Comment;
                $scope.News = response.data.News;
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
    }

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CCM_Home/ApproveComment',
            data: $scope.item
        }).then(function successCallback(response) {
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
});
angular.module('WebApiApp').controller("ModalAdsHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        $scope.GetDropCMSCategories();
        $scope.LoadGroupLinks('link');
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Ads/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

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
    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Ads',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
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
                url: '/CMS_Categories/UploadImage',
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
angular.module('WebApiApp').controller("ModalGroupLinksHandlerController", function ($rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    $scope.item.Type = "gallery";
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        $scope.item.Type = "gallery";
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg',
                Type: 'gallery'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_GroupLinks/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }


    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_GroupLinks',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
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
                url: '/CMS_Categories/UploadImage',
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

angular.module('WebApiApp').controller("ModalGalleryHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {


    //debugger
    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        $scope.GetDropMenu();
        $scope.LoadGroupLinks('gallery');
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg',
                GroupLinks: angular.copy($scope.$$prevSibling.Paging.AlbumId).toString()
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Gallery/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

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
    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Gallery',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0 || $scope.item.Id == undefined)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
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
                url: '/CMS_Categories/UploadImage',
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

angular.module('WebApiApp').controller("ModalVideosHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {


    //debugger
    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        $scope.GetDropMenu();
        $scope.LoadGroupLinks('video');
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg',
                GroupLinks: angular.copy($scope.$$prevSibling.Paging.AlbumId).toString()
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Video/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

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
    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Video',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0 || $scope.item.Id == undefined)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
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
                url: '/CMS_Categories/UploadImage',
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


angular.module('WebApiApp').controller("ModalDocumentHandlerController", function ($q,$rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        $('#summernote').summernote({
            height: 150,
        });
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                //Image: '../../../Uploads/Banners/banner-no-image.jpg',
                //FileAttachment: []
            };
            $scope.ListFileAttach = [];
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Documents/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if (angular.isDefined($scope.item.IssuedDate)) {
                    $('#IssuedDate').datepicker("setDate", new Date($scope.item.IssuedDate));
                }
                $('#summernote').summernote('code', $scope.item.FDescription);
                $scope.GetFileByDocument(response.data.FCode);
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

    $scope.DocStatus = [
        {
            value: 'DRAFT', text: 'Soạn thảo'
        },
        {
            value: 'APPROVED', text: 'Đã duyệt'
        }
    ]
    $scope.SaveModal = function () {
        
        $scope.item.FDescription = $('#summernote').summernote('code');
        $http({
            method: 'POST',
            url: '/api/CMS_Documents',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.SaveDoc($scope.item.FCode, $scope.ListFileAttach);
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    $scope.DeleteBanner = function () {
        if (confirm('Thao tác sẽ xóa toàn bộ tệp đính kèm của văn bản, bạn có chắc chắn thực hiện thao tác này?')) {
            angular.forEach($scope.ListFileAttach, function (obj) {
                if (obj.Id != null) {
                    $http({
                        method: 'POST',
                        url: '/api/CMS_Documents/DeleteFile',
                        data: obj
                    }).then(function successCallback(response) {
                        var index = $scope.ListFileAttach.findIndex(x => x.Path == obj.Path)
                        if (index != -1) {
                            $scope.ListFileAttach.splice(index, 1);
                        }
                        //toastr.warning('Xóa tệp thành công !', 'Thông báo');
                    }, function errorCallback(response) {
                        //$scope.itemError = response.data;
                        toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
                    });
                }
                else {
                    var index = $scope.ListFileAttach.findIndex(x => x.Path == obj.Path)
                    if (index != -1) {
                        $scope.ListFileAttach.splice(index, 1);
                    }
                }
            })
            document.getElementById('file').value = '';
            toastr.warning('Xóa tệp thành công !', 'Thông báo');
        }
    }
    $scope.ShowDeleteButton = function () {
        if ($scope.ListFileAttach != null && $scope.ListFileAttach.length != 0)
            return true;
        else return false;
    }
    $scope.UploadBanner = function () {
        var files = document.getElementById('file').files;
        if (files.length > 0) {
            $scope.UploadFile(files).then(dt => {
                document.getElementById('file').value = '';
            });

        }
        else
            alert('Vui lòng chọn tệp để tải lên!')
    }
    $scope.UploadFile = function (files) {
        var def = $q.defer();
        angular.forEach(files, function (obj) {
            data = new FormData();
            data.append("file", obj);
            $http({
                method: 'POST',
                url: '/CMS_Categories/UpLoadDocument',
                data: data,
                headers: {
                    "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                    'Content-type': undefined
                }
            }).then(function successCallback(response) {
                if (response.data != null) {
                    if (response.data.length != 0) {
                        response.data[0].FName = response.data[0].Name;
                        $scope.ListFileAttach.push(response.data[0]);
                        def.resolve($scope.ListFileAttach);
                    }

                }

            }, function errorCallback(response) {

            });
        })
        return def.promise;
    }
    $scope.RemoveFile = function (o) {
        if (confirm('Bạn có chắc chắn muốn xóa tệp này?')) {
            $http({
                method: 'POST',
                url: '/api/CMS_Documents/DeleteFile',
                data: o
            }).then(function successCallback(response) {
                var index = $scope.ListFileAttach.findIndex(x => x.Path == o.Path)
                if (index != -1) {
                    $scope.ListFileAttach.splice(index, 1);
                }
                toastr.warning('Xóa tệp thành công !', 'Thông báo');
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    $scope.SaveDoc = function (docCode , listFile) {
        $http({
            method: 'POST',
            url: '/api/CMS_Documents/SaveFile',
            params: { docCode: docCode},
            data: listFile
        }).then(function successCallback(response) {
        }, function errorCallback(response) {
            //$scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    $scope.GetFileByDocument = function (docCode) {
        $http({
            method: 'GET',
            url: '/api/CMS_Documents/GetFileByDoc',
            params: { docCode: docCode}
        }).then(function successCallback(response) {
            $scope.ListFileAttach = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
});

angular.module('WebApiApp').controller("ModalMetaHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        //$scope.GetDropCMSCategories();
        //$scope.LoadGroupLinks('link');
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                //Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Meta/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                //if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                //    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                //}
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    //$scope.LoadGroupLinks = function (type) {
    //    var def = $q.defer();
    //    $http({
    //        method: 'GET',
    //        url: '/api/CMS_GroupLinks/GetList',
    //        params: { type: type }
    //    }).then(function successCallback(response) {
    //        $scope.GroupLinks = response.data;
    //        def.resolve($scope.GroupLinks);
    //    }, function errorCallback(response) {
    //        def.reject($scope.GroupLinks);
    //        toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
    //    });
    //    return def.promise;
    //}

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Meta',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
});

angular.module('WebApiApp').controller("ModalLibraryHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        //$scope.GetDropCMSCategories();
        //$scope.LoadGroupLinks('link');
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                //Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Library/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                //if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                //    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                //}
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    //$scope.LoadGroupLinks = function (type) {
    //    var def = $q.defer();
    //    $http({
    //        method: 'GET',
    //        url: '/api/CMS_GroupLinks/GetList',
    //        params: { type: type }
    //    }).then(function successCallback(response) {
    //        $scope.GroupLinks = response.data;
    //        def.resolve($scope.GroupLinks);
    //    }, function errorCallback(response) {
    //        def.reject($scope.GroupLinks);
    //        toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
    //    });
    //    return def.promise;
    //}

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Library',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
});

angular.module('WebApiApp').controller("ModalQAHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    $scope.innitModal = function () {
        //$scope.GetDropCMSCategories();
        //$scope.LoadGroupLinks('link');
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_News/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                //if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                //    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                //}
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    //$scope.LoadGroupLinks = function (type) {
    //    var def = $q.defer();
    //    $http({
    //        method: 'GET',
    //        url: '/api/CMS_GroupLinks/GetList',
    //        params: { type: type }
    //    }).then(function successCallback(response) {
    //        $scope.GroupLinks = response.data;
    //        def.resolve($scope.GroupLinks);
    //    }, function errorCallback(response) {
    //        def.reject($scope.GroupLinks);
    //        toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
    //    });
    //    return def.promise;
    //}

    $scope.SaveModal = function () {
        $scope.item.FStatus = 'APPROVED';
        var data = {
            News: $scope.item,
            Files: []
        };
        $http({
            method: 'POST',
            url: '/api/CMS_News',
            //params: { id: $scope.item.Id},
            data: data
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item == 0) {
                bool = true;
            }
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
   
});
angular.module('WebApiApp').controller("ModalIntroductHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        $scope.GetPage();
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Introduct/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    $scope.GetPage = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetPage',
        }).then(function successCallback(response) {
            $scope.ListPage = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }

   
    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Introduct',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
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
                url: '/CMS_Categories/UploadImage',
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

angular.module('WebApiApp').controller("ModalRaceHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {

        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg',
                RouterProfile: '../../../Uploads/Banners/banner-no-image.jpg',
                RaceMap: '../../../Uploads/Banners/banner-no-image.jpg',
            };
            $scope.ListPrice = [];
            $scope.ListRaceKitForRace = [];
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Race/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
                $scope.GetListPrice($scope.item.Id);
                $scope.LoadRaceKitByRace($scope.item.Id);
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.GetListPrice = function (id) {
        $http({
            method: 'GET',
            url: '/api/CMS_Prize/GetByRaceId',
            params: { id: id }
        }).then(function successCallback(response) {
            $scope.ListPrice = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Race',
            data: $scope.item
        }).then(function successCallback(response) {

            angular.forEach($scope.ListPrice, function (value) {
                value.RaceId = $scope.item.Id;
                $scope.SavePrice(value);
            });
            angular.forEach($scope.ListRaceKitForRace, function (value) {
                value.RaceId = $scope.item.Id;
            });
            $scope.SaveRaceKitForRace();
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    $scope.SavePrice = function (item) {
        $http({
            method: 'POST',
            url: '/api/CMS_Prize',
            data: item
        }).then(function successCallback(response) {

        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    // upload router profile
    $scope.DeleteBanner = function () {
        if ($scope.item.RouterProfile != null && $scope.item.RouterProfile != '') {
            $scope.item.RouterProfile = '../../../Uploads/Banners/banner-no-image.jpg';
        }
    }
    $scope.ShowDeleteButton = function () {
        if ($scope.item.RouterProfile != null && $scope.item.RouterProfile != '' && $scope.item.RouterProfile != '../../../Uploads/Banners/banner-no-image.jpg')
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
                url: '/CMS_Categories/UploadImage',
                data: data,
                headers: {
                    "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                    'Content-type': undefined
                }
            }).then(function successCallback(response) {
                $scope.item.RouterProfile = response.data;
            }, function errorCallback(response) {

            });
        }
        else
            alert('Vui lòng chọn hình ảnh để tải lên!')
    }

    //upload race map

    $scope.DeleteBanner_2 = function () {
        if ($scope.item.RaceMap != null && $scope.item.RaceMap != '') {
            $scope.item.RaceMap = '../../../Uploads/Banners/banner-no-image.jpg';
        }
    }
    $scope.ShowDeleteButton_2 = function () {
        if ($scope.item.RaceMap != null && $scope.item.RaceMap != '' && $scope.item.RaceMap != '../../../Uploads/Banners/banner-no-image.jpg')
            return true;
        else return false;
    }
    $scope.UploadBanner_2 = function () {
        var files = document.getElementById('file_2').files;
        if (files.length > 0) {
            data = new FormData();
            data.append("file", files[0]);
            $http({
                method: 'POST',
                url: '/CMS_Categories/UploadImage',
                data: data,
                headers: {
                    "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                    'Content-type': undefined
                }
            }).then(function successCallback(response) {
                $scope.item.RaceMap = response.data;
            }, function errorCallback(response) {

            });
        }
        else
            alert('Vui lòng chọn hình ảnh để tải lên!')
    }

    // thêm giải thưởng

    $scope.AddPrize = function () {
        if ($scope.ListPrice != null) {
            var o = {
            };
            $scope.ListPrice.push(o);
        }
    }
    $scope.AddRaceKit = function () {
        if ($scope.ListRaceKitForRace != null) {
            var o = {
            };
            $scope.ListRaceKitForRace.push(o);
        }
    };

    $scope.LoadRaceKit = function () {
        $http({
            method: 'GET',
            url: '/api/CMS_Race/LoadRaceKit'
        }).then(function successCallback(response) {
            $scope.ddlRaceKit = response.data;
        }, function errorCallback(response) {

        });
    };

    $scope.LoadRaceKitByRace = function (RaceId) {
        $http({
            method: 'GET',
            url: '/api/CMS_Race/LoadRaceKitByRace?RaceId=' + RaceId
        }).then(function successCallback(response) {
            $scope.ListRaceKitForRace = response.data;
            $scope.ListRaceKitForRace.forEach(function (value, key) {
                value.RaceKitId = value.RaceKitId.toString();
            });
        }, function errorCallback(response) {
            toastr.warning('Có lỗi xảy ra trong quá trình load trang bị cho cự ly', 'Thông báo');
        });
    }

    $scope.SaveRaceKitForRace = function () {
        let IsValid = true;

        $scope.ListRaceKitForRace.forEach(function (value, key) {
            if ($scope.ListRaceKitForRace.filter(c => c.RaceKitId == value.RaceKitId).length > 1) {
                toastr.warning('Danh sách của bạn đang phát hiện có RaceKit bị trùng nhau', 'Thông báo');
                IsValid = false;
            }
        });

        $scope.ListRaceKitForRace.forEach(function (value, key) {
            if (value.IsRequied == true && value.IsNotRequied == true) {
                toastr.warning('Tồn tại RaceKit đang có cả hai tình trạng bắt buộc và khuyến cáo', 'Thông báo');
                IsValid = false;
            }
        });

        $scope.ListRaceKitForRace.forEach(function (value, key) {
            if (value.IsRequied == false && value.IsNotRequied == false) {
                toastr.warning('Tồn tại RaceKit không có tình trạng nào trong hai tình trạng bắt buộc hoặc khuyến cáo', 'Thông báo');
                IsValid = false;
            }
        });
        if (IsValid == true) {

            $http({
                method: 'POST',
                url: '/api/CMS_Race/UpdateRaceKitOfRace',
                data: $scope.ListRaceKitForRace
            }).then(function successCallback(response) {

            }, function errorCallback(response) {
                toastr.warning('Có lỗi xảy ra trong quá trình cập nhật trang bị cho cự ly', 'Thông báo');
            });
        }
    };
});
angular.module('WebApiApp').controller("ModalPhiDKHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {






    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {

        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg',
                RouterProfile: '../../../Uploads/Banners/banner-no-image.jpg',
                RaceMap: '../../../Uploads/Banners/banner-no-image.jpg',
            };
            $scope.ListPrice = [];
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_DanhMucPhiDK/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
                $scope.GetListPrice($scope.item.Id);
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.GetListPrice = function (id) {
        $http({
            method: 'GET',
            url: '/api/CMS_PriceRace/GetByPhiDKId',
            params: { id: id }
        }).then(function successCallback(response) {
            $scope.ListPrice = response.data;
        }, function errorCallback(response) {
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_DanhMucPhiDK',
            data: $scope.item
        }).then(function successCallback(response) {

            angular.forEach($scope.ListPrice, function (value) {
                value.PhiDK_Id = $scope.item.Id;
                $scope.SavePrice(value);
            })
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    $scope.SavePrice = function (item) {
        $http({
            method: 'POST',
            url: '/api/PriceRace',
            data: item
        }).then(function successCallback(response) {

        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    // upload router profile
    $scope.DeleteBanner = function () {
        if ($scope.item.RouterProfile != null && $scope.item.RouterProfile != '') {
            $scope.item.RouterProfile = '../../../Uploads/Banners/banner-no-image.jpg';
        }
    }
    $scope.ShowDeleteButton = function () {
        if ($scope.item.RouterProfile != null && $scope.item.RouterProfile != '' && $scope.item.RouterProfile != '../../../Uploads/Banners/banner-no-image.jpg')
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
                url: '/CMS_Categories/UploadImage',
                data: data,
                headers: {
                    "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                    'Content-type': undefined
                }
            }).then(function successCallback(response) {
                $scope.item.RouterProfile = response.data;
            }, function errorCallback(response) {

            });
        }
        else
            alert('Vui lòng chọn hình ảnh để tải lên!')
    }

    //upload race map

    $scope.DeleteBanner_2 = function () {
        if ($scope.item.RaceMap != null && $scope.item.RaceMap != '') {
            $scope.item.RaceMap = '../../../Uploads/Banners/banner-no-image.jpg';
        }
    }
    $scope.ShowDeleteButton_2 = function () {
        if ($scope.item.RaceMap != null && $scope.item.RaceMap != '' && $scope.item.RaceMap != '../../../Uploads/Banners/banner-no-image.jpg')
            return true;
        else return false;
    }
    $scope.UploadBanner_2 = function () {
        var files = document.getElementById('file_2').files;
        if (files.length > 0) {
            data = new FormData();
            data.append("file", files[0]);
            $http({
                method: 'POST',
                url: '/CMS_Categories/UploadImage',
                data: data,
                headers: {
                    "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
                    'Content-type': undefined
                }
            }).then(function successCallback(response) {
                $scope.item.RaceMap = response.data;
            }, function errorCallback(response) {

            });
        }
        else
            alert('Vui lòng chọn hình ảnh để tải lên!')
    }

    // thêm giải thưởng

    $scope.AddPrize = function () {
        if ($scope.ListPrice != null) {
            var o = {
            };
            $scope.ListPrice.push(o);
        }
    }
  

});

angular.module('WebApiApp').controller("ModalAuthorHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {






    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {

        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg',
                RouterProfile: '../../../Uploads/Banners/banner-no-image.jpg',
                RaceMap: '../../../Uploads/Banners/banner-no-image.jpg',
            };
            $scope.ListPrice = [];
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_Author/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
                //$scope.GetListPrice($scope.item.Id);
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    //$scope.GetListPrice = function (id) {
    //    $http({
    //        method: 'GET',
    //        url: '/api/CMS_PriceRace/GetByPhiDKId',
    //        params: { id: id }
    //    }).then(function successCallback(response) {
    //        $scope.ListPrice = response.data;
    //    }, function errorCallback(response) {
    //        toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
    //    });
    //}

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Author',
            data: $scope.item
        }).then(function successCallback(response) {

            //angular.forEach($scope.ListPrice, function (value) {
            //    value.PhiDK_Id = $scope.item.Id;
            //    $scope.SavePrice(value);
            //})
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    //$scope.SavePrice = function (item) {
    //    $http({
    //        method: 'POST',
    //        url: '/api/PriceRace',
    //        data: item
    //    }).then(function successCallback(response) {

    //    }, function errorCallback(response) {
    //        $scope.itemError = response.data;
    //        toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
    //    });
    //}
    // upload router profile
    //$scope.DeleteBanner = function () {
    //    if ($scope.item.RouterProfile != null && $scope.item.RouterProfile != '') {
    //        $scope.item.RouterProfile = '../../../Uploads/Banners/banner-no-image.jpg';
    //    }
    //}
    //$scope.ShowDeleteButton = function () {
    //    if ($scope.item.RouterProfile != null && $scope.item.RouterProfile != '' && $scope.item.RouterProfile != '../../../Uploads/Banners/banner-no-image.jpg')
    //        return true;
    //    else return false;
    //}
    //$scope.UploadBanner = function () {
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) {
    //        data = new FormData();
    //        data.append("file", files[0]);
    //        $http({
    //            method: 'POST',
    //            url: '/CMS_Categories/UploadImage',
    //            data: data,
    //            headers: {
    //                "Authorization": $cookies.get('token_type') + ' ' + $cookies.get('token'),
    //                'Content-type': undefined
    //            }
    //        }).then(function successCallback(response) {
    //            $scope.item.RouterProfile = response.data;
    //        }, function errorCallback(response) {

    //        });
    //    }
    //    else
    //        alert('Vui lòng chọn hình ảnh để tải lên!')
    //}

   

});

angular.module('WebApiApp').controller("ModalRaceKitHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {

        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg',
                RouterProfile: '../../../Uploads/Banners/banner-no-image.jpg',
                RaceMap: '../../../Uploads/Banners/banner-no-image.jpg',
            };
           // $scope.ListPrice = [];
        }
        else {
            $http({
                method: 'GET',
                url: '/api/CMS_RaceKit/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                if ($scope.item.GroupLinks != null && $scope.item.GroupLinks != '') {
                    $scope.item.GroupLinks = $scope.item.GroupLinks.toString();
                }
               
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
  

    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_RaceKit',
            data: $scope.item
        }).then(function successCallback(response) {

        
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            $scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
 
    // upload router profile
    $scope.DeleteBanner = function () {
        if ($scope.item.RouterProfile != null && $scope.item.RouterProfile != '') {
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
                url: '/CMS_Categories/UploadImage',
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

//---------------------- Minh -------------------------------------------
angular.module('WebApiApp').controller("ModalSponsorsHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {



    $scope.item = $scope.$resolve.item;
    //$scope.type = $scope.$resolve.type;
    $scope.innitModal = function () {
        $scope.GetDropCMSCategories();
        if ($scope.item == null || $scope.item == '') {
            $scope.item = {
                Image: '../../../Uploads/Banners/banner-no-image.jpg'
            };
        }
        else {
            $http({
                method: 'GET',
                url: '/api/SponsorAndPartner/GetById',
                params: { id: $scope.item }
            }).then(function successCallback(response) {
                $scope.item = response.data;
                
            }, function errorCallback(response) {
                toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
            });
        }
    }
    //$scope.showButtonUpload = function () {
    //    debugger
    //    var show = false;
    //    var files = document.getElementById('file').files;
    //    if (files.length > 0) show = true;
    //    return show;
    //}

    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {
        $http({
            method: 'POST',
            url: '/api/SponsorAndPartner',
            data: $scope.item
        }).then(function successCallback(response) {
            var bool = false;
            if ($scope.item.Id == 0)
                bool = true;
            //$scope.$$prevSibling.GetListBanner(bool);
            $uibModalInstance.dismiss('close');
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
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
                url: '/CMS_Categories/UploadImage',
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

angular.module('WebApiApp').controller("ModalContactHandlerController", function ($q, $rootScope, $scope, $http, $uibModalInstance, $cookies) {
    
    
    $scope.item = $scope.$resolve.item;
    $scope.innitModal = function () {
        $http({
            method: 'GET',
            url: '/api/CMS_Contact/GetById',
            params: { id: $scope.item }
        }).then(function successCallback(response) {
            $scope.item = response.data;
            $scope.GetNameType($scope.item);
            $http({
                method: 'POST',
                url: '/api/CMS_Contact/HasRead',
                data: $scope.item
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
            });
        }, function errorCallback(response) {
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    $scope.cancelModal = function () {
        $scope.$$prevSibling.GetListBanner();
        $uibModalInstance.dismiss('close');
    }
    $scope.GetNameType = function (item) {
        if (item.Type == "staff") {
            item.TypeName = "Nhân viên văn phòng"
        }
        if (item.Type == "athletes") {
            item.TypeName = "Vận động viên"
        }
        if (item.Type == "sale") {
            item.TypeName = "Nhân viên bán hàng"
        }
        if (item.Type == "other") {
            item.TypeName = "Khác"
        }
    }
    $scope.MakeUnRead = function () {
        $http({
            method: 'POST',
            url: '/api/CMS_Contact/MakeUnRead',
            data: $scope.item
        }).then(function successCallback(response) {
            $uibModalInstance.dismiss('close');
            $scope.$$prevSibling.GetListBanner();
            toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
});