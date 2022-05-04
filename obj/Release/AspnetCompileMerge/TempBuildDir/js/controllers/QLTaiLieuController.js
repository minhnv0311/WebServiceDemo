angular.module('WebApiApp').controller("ModelQLTaiLieuHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.itemUser;
    $scope.Type= $scope.$resolve.Type;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if (typeof $scope.item.Id == 'undefined' || $scope.item.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/QL_TaiLieu',
                data: $scope.item
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $rootScope.Load();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/QL_TaiLieu/' + $scope.item.Id,
                data: $scope.item
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.item.Id + ' !', 'Thông báo');
                $rootScope.Load();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // or server returns response with an error status.
            });
        }

    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidQLTaiLieu/' + FCode,
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

    //Xử lý file
    $scope.ListFile_DonDeNghi = [];
    var formdata1 = new FormData();
    $scope.getTheFiles1 = function ($files) {
        formdata1 = new FormData();
        angular.forEach($files, function (value, key) {
            formdata1.append(key, value);
        });

        $http({
            method: 'POST',
            url: '/api/QLTaiLieu/UploadMultipleFile',
            data: formdata1,
            headers: {
                'Content-Type': undefined
            }
        }).then(function successCallback(response) {
            angular.forEach(formdata1, function (value, key) {
                if ($scope.ListFile_DonDeNghi.indexOf(value.name) === -1) {
                    $scope.ListFile_DonDeNghi.push(value.name);
                }
            });
            $scope.DonDeNghi = response.data.list;
            $scope.item.DonDeNghi = response.data.file;
        }, function errorCallback(response) {
            toastr.error('Tải file không thành công !', 'Thông báo');
        });
    };
    $scope.ListFile_GiayPhep = [];
    var formdata2 = new FormData();
    $scope.getTheFiles2 = function ($files) {
        formdata2 = new FormData();
        angular.forEach($files, function (value, key) {
            formdata2.append(key, value);
        });

        $http({
            method: 'POST',
            url: '/api/QLTaiLieu/UploadMultipleFile',
            data: formdata2,
            headers: {
                'Content-Type': undefined
            }
        }).then(function successCallback(response) {
            angular.forEach(formdata2, function (value, key) {
                if ($scope.ListFile_GiayPhep.indexOf(value.name) === -1) {
                    $scope.ListFile_GiayPhep.push(value.name);
                }
            });
            $scope.GiayPhep = response.data.list;
            $scope.item.GiayPhep = response.data.file;
        }, function errorCallback(response) {
            toastr.error('Tải file không thành công !', 'Thông báo');
        });
    };
    $scope.GetListFilesHas = function () {
        $http({
            method: 'GET',
            url: '/api/QLTaiLieu/ConvertStringToListString?FCode=' + $scope.item.FCode
        }).then(function successCallback(response) {
            $scope.lstDonDeNghi = response.data.lst1;
            $scope.lstGiayPhep = response.data.lst2;
        }, function errorCallback(response) {

        });
    }
    $scope.GetListDonVi = function () {
        $http({
            method: 'GET',
            url: '/api/QLTaiLieu/GetListDonVi'
        }).then(function successCallback(response) {
            $rootScope.lstCoQuan = response.data.lst1;
            $rootScope.lstCoSoIn = response.data.lst2;
        }, function errorCallback(response) {

        });
    }
    $rootScope.AutoSelectCQ = function (FCode) {
        $scope.item.CoQuanXinCapPhep = FCode;
    }
    $rootScope.AutoSelectCSI = function (FCode) {
        $scope.item.CoSoIn = FCode;
    }
    $scope.DeleteFileDonDeNghi = function (item) {
        $scope.lstDonDeNghi.forEach(function (value, key) {
            if (value == item) {
                $scope.lstDonDeNghi.splice(key, 1);
            }
        });
        $http({
            method: 'POST',
            url: '/api/QLTaiLieu/ConvertListStringToString',
            data: $scope.lstDonDeNghi
        }).then(function successCallback(response) {
            $scope.item.DonDeNghi = response.data;
        }, function errorCallback(response) {

        });
    };
    $scope.DeleteFileGiayPhep = function (item) {
        $scope.lstGiayPhep.forEach(function (value, key) {
            if (value == item) {
                $scope.lstGiayPhep.splice(key, 1);
            }
        });
        $http({
            method: 'POST',
            url: '/api/QLTaiLieu/ConvertListStringToString',
            data: $scope.lstGiayPhep
        }).then(function successCallback(response) {
            $scope.item.GiayPhep = response.data;
        }, function errorCallback(response) {

        });
    };
    $scope.OnLoad = function () {
        ComponentsSelect2.init();
        $scope.GetListFilesHas();
        $scope.GetListDonVi();
        $.fn.datepicker.dates['vi'] = {
            days: ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ nhật"],
            daysShort: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
            daysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7", "CN"],
            months: ["Tháng 1", "Tháng 1", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            monthsShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            today: "Hôm nay"
        };
        $('.date input,input').attr('autocomplete', 'off');
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            format: 'dd/mm/yyyy',
            orientation: "right",
            autoclose: true,
            minDate: 0,
            language: 'vi'
        });
    };
});
angular.module('WebApiApp').controller("ModelCoQuanXinCapPhepHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.itemUser;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if (typeof $scope.item.Id == 'undefined' || $scope.item.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/DM_CoQuan',
                data: $scope.item
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $http({
                    method: 'GET',
                    url: '/api/QLTaiLieu/GetListDonVi'
                }).then(function successCallback(response1) {
                    $rootScope.lstCoQuan = response1.data.lst1;
                    $rootScope.lstCoSoIn = response1.data.lst2;
                    $rootScope.AutoSelectCQ($scope.item.FCode);
                }, function errorCallback(response) {

                });
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/DM_CoQuan/' + $scope.item.Id,
                data: $scope.item
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                $http({
                    method: 'GET',
                    url: '/api/QLTaiLieu/GetListDonVi'
                }).then(function successCallback(response1) {
                    $rootScope.lstCoQuan = response1.data.lst1;
                    $rootScope.lstCoSoIn = response1.data.lst2;
                    $rootScope.AutoSelectCQ($scope.item.FCode);
                }, function errorCallback(response) {

                });
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.item.Id + ' !', 'Thông báo');
                $rootScope.Load();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // or server returns response with an error status.
            });
        }

    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidCoQuanXinCapPhep/' + FCode,
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
angular.module('WebApiApp').controller("ModelCoSoInHandlerController", function ($rootScope, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.itemUser;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    $scope.SaveModal = function () {

        if (typeof $scope.item == 'undefined') {
            toastr.error('Chưa cập nhật số liệu !', 'Thông báo');
            return;
        }
        if (typeof $scope.item.Id == 'undefined' || $scope.item.Id == 0) {
            $http({
                method: 'POST',
                url: '/api/DM_CoSoIn',
                data: $scope.item
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $http({
                    method: 'GET',
                    url: '/api/QLTaiLieu/GetListDonVi'
                }).then(function successCallback(response1) {
                    $rootScope.lstCoQuan = response1.data.lst1;
                    $rootScope.lstCoSoIn = response1.data.lst2;
                    $rootScope.AutoSelectCSI($scope.item.FCode);
                }, function errorCallback(response) {

                });
                toastr.success('Cập nhật dữ liệu thành công !', 'Thông báo');
                $rootScope.Load();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
        else {
            $http({
                method: 'PUT',
                url: '/api/DM_CoSoIn/' + $scope.item.Id,
                data: $scope.item
            }).then(function successCallback(response) {
                console.log(response);
                // this callback will be called asynchronously
                // when the response is available
                $http({
                    method: 'GET',
                    url: '/api/QLTaiLieu/GetListDonVi'
                }).then(function successCallback(response1) {
                    $rootScope.lstCoQuan = response1.data.lst1;
                    $rootScope.lstCoSoIn = response1.data.lst2;
                    $rootScope.AutoSelectCSI($scope.item.FCode);
                }, function errorCallback(response) {

                });
                toastr.success('Cập nhật dữ liệu thành công Id = ' + $scope.item.Id + ' !', 'Thông báo');
                $rootScope.Load();
                $uibModalInstance.close('save');
            }, function errorCallback(response) {
                $scope.itemPerError = response.data;
                $scope.LoadError($scope.itemPerError.ModelState);
                // or server returns response with an error status.
            });
        }

    }
    $scope.ValidOnlyCode = function (FCode) {
        if (typeof $scope.item == 'undefined') {
            $scope.item = {};

        }
        $http({
            method: 'GET',
            url: '/api/CheckValidCoSoIn/' + FCode,
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
///* Setup blank page controller */
angular.module('WebApiApp').controller('QLTaiLieuController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.cancelModal = function () {
        $uibModal.dismiss('close');
    }

    $scope.Delete = function (Id) {
        if (confirm('Bạn có chắc chắn xóa bản ghi này ko ?')) {
            $http({
                method: 'DELETE',
                url: '/api/QL_TaiLieu/' + Id
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available     

                toastr.warning('Đã xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.Load();
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.error('Không xóa được dữ liệu !', 'Thông báo');
            });
        }
    };
    $scope.Paging = {
        "CoQuan": '',
        "CoSoIn": '',
        "TuNgay": '',
        "DenNgay": '',
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
            $rootScope.Load();
        }

    }
    $scope.NextPage = function () {
        if ($scope.Paging.currentPage < $scope.Paging.totalPage) {
            $scope.Paging.currentPage = $scope.Paging.currentPage + 1;
            if ($scope.Paging.currentPage == $scope.Paging.totalPage) {
                $scope.Paging.currentPage == $scope.Paging.totalPage
            }
            $rootScope.Load();
        }

    }
    $rootScope.Load = function () {

        if ($scope.Paging.currentPage == '') return;
        if ($scope.Paging.currentPage == 0 || $scope.Paging.currentPage > $scope.Paging.totalPage)
            $scope.Paging.currentPage = 1;
        $rootScope.Loading = true;
        $http({
            method: 'GET',
            url: '/api/QL_TaiLieu?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&CoQuan=' + $scope.Paging.CoQuan + '&CoSoIn=' + $scope.Paging.CoSoIn + '&TuNgay=' + $scope.Paging.TuNgay + '&DenNgay=' + $scope.Paging.DenNgay + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.Areas = response.data.QL_TaiLieu;
            $scope.ListTaiLieu = response.data.TaiLieuIn;
            $scope.Areas.forEach(function (value, key) {
                $http({
                    method: 'GET',
                    url: '/api/QLTaiLieu/ConvertStringToListString?FCode=' + value.FCode
                }).then(function successCallback(response1) {
                    $scope.Areas[key].lstDonDeNghi = response1.data.lst1;
                    $scope.Areas[key].lstGiayPhep = response1.data.lst2;
                }, function errorCallback(response) {

                });
            });
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.pageEnd = response.data.pageEnd;
            $scope.Paging.totalPage = response.data.totalPage;
            $rootScope.Loading = false;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $scope.GetListDonVi = function () {
        $http({
            method: 'GET',
            url: '/api/QLTaiLieu/GetListDonVi'
        }).then(function successCallback(response) {
            $rootScope.lstCoQuan = response.data.lst1;
            $rootScope.lstCoSoIn = response.data.lst2;
        }, function errorCallback(response) {

        });
    }
    $scope.GetTenCoQuan = function (item) {
        $http({
            method: 'GET',
            url: '/api/QLTaiLieu/GetFNameByFCode?Module=DM_CoQuan&FCode=' + item.CoQuanXinCapPhep
        }).then(function successCallback(response) {
            item.TenCoQuan = response.data;
        }, function errorCallback(response) {

        });
    };
    $scope.GetTenCoSoIn = function (item) {
        $http({
            method: 'GET',
            url: '/api/QLTaiLieu/GetFNameByFCode?Module=DM_CoSoIn&FCode=' + item.CoSoIn
        }).then(function successCallback(response) {
            item.TenCoSoIn = response.data;
        }, function errorCallback(response) {

        });
    };
    $rootScope.DownloadFile = function (nameFile) {
        window.open("/Uploads/Documents/Files/" + nameFile, "");
    };
    $scope.ExportExcel = function () {
        if ($scope.ListTaiLieu.length == 0 || $scope.ListTaiLieu == undefined) {
            toastr.warning('Danh sách trống', 'Thông báo');
            return;
        }
        var data = {
            QL_TaiLieu: $scope.ListTaiLieu,
            TuNgay: $scope.Paging.TuNgay,
            DenNgay: $scope.Paging.DenNgay,
        }
        $http({
            method: 'POST',
            url: '/api/QLTaiLieu/ExportExcel',
            data: data,
            responseType: "arraybuffer"
        }).then(function successCallback(response) {
            var headers = response;
            var file = new Blob([response.data], { type: 'application/vnd.ms-excel' });
            saveAs(file, 'Danh_sach_tai_lieu_cap_phep.xlsx');
        }, function errorCallback(response) {
            console.log(response.data)
            toastr.error('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    };
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        //App.initAjax();
        //// set default layout mode
        //$rootScope.$settings.layout.pageContentWhite = true;
        //$rootScope.$settings.layout.pageBodySolid = false;
        //$rootScope.$settings.layout.pageSidebarClosed = true;
        // Simple GET request example:
        $rootScope.Load();
        ComponentsSelect2.init();
        $scope.GetListDonVi();
        $.fn.datepicker.dates['vi'] = {
            days: ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ nhật"],
            daysShort: ["CN", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"],
            daysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7", "CN"],
            months: ["Tháng 1", "Tháng 1", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            monthsShort: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
            today: "Hôm nay"
        };
        $('.date input,input').attr('autocomplete', 'off');
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            format: 'dd/mm/yyyy',
            orientation: "right",
            autoclose: true,
            minDate: 0,
            language: 'vi'
        });

    });

}]);
