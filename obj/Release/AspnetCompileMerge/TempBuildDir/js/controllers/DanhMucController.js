angular.module('WebApiApp').controller('DanhMucController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {


}]);

angular.module('WebApiApp').controller('DMCoQuanBanHanhController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMCoQuanBanHanh/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMCoQuanBanHanh();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMCoQuanBanHanh = function () {

        $http({
            method: 'GET',
            url: 'api/DMCoQuanBanHanh/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMCoQuanBanHanh = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMCoQuanBanHanh();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMCoQuanBanHanh();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMDoChinhXacAnhController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMDoChinhXacAnh/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMDoChinhXacAnh();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMDoChinhXacAnh = function () {

        $http({
            method: 'GET',
            url: 'api/DMDoChinhXacAnh/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMDoChinhXacAnh = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMDoChinhXacAnh();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMDoChinhXacAnh();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMDoiTuongKhaiThacController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMDoiTuongKhaiThac/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMDoiTuongKhaiThac();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMDoiTuongKhaiThac = function () {

        $http({
            method: 'GET',
            url: 'api/DMDoiTuongKhaiThac/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMDoiTuongKhaiThac = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMDoiTuongKhaiThac();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMDoiTuongKhaiThac();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMDonViNopLuuController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMDonViNopLuu/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMDonViNopLuu();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMDonViNopLuu = function () {

        $http({
            method: 'GET',
            url: 'api/DMDonViNopLuu/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMDonViNopLuu = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMDonViNopLuu();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMDonViNopLuu();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMGiaTriDacBietController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMGiaTriDacBiet/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMGiaTriDacBiet();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMGiaTriDacBiet = function () {

        $http({
            method: 'GET',
            url: 'api/DMGiaTriDacBiet/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMGiaTriDacBiet = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMGiaTriDacBiet();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMGiaTriDacBiet();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMHinhThucKhaiThacController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMHinhThucKhaiThac/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMHinhThucKhaiThac();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMHinhThucKhaiThac = function () {

        $http({
            method: 'GET',
            url: 'api/DMHinhThucKhaiThac/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMHinhThucKhaiThac = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMHinhThucKhaiThac();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMHinhThucKhaiThac();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMLinhVucHoatDongController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLinhVucHoatDong/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLinhVucHoatDong();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLinhVucHoatDong = function () {

        $http({
            method: 'GET',
            url: 'api/DMLinhVucHoatDong/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLinhVucHoatDong = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLinhVucHoatDong();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLinhVucHoatDong();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMLoaiAnhController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLoaiAnh/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiAnh();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiAnh = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiAnh/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLoaiAnh = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLoaiAnh();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiAnh();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMLoaiBangDiaController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLoaiBangDia/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiBangDia();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiBangDia = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiBangDia/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLoaiBangDia = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLoaiBangDia();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiBangDia();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMLoaiGhiAmController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLoaiGhiAm/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiGhiAm();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiGhiAm = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiGhiAm/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLoaiGhiAm = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLoaiGhiAm();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiGhiAm();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMLoaiHinhVanBanController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLoaiHinhVanBan/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiHinhVanBan();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiHinhVanBan = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiHinhVanBan/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLoaiHinhVanBan = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLoaiHinhVanBan();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiHinhVanBan();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMLoaiPhimController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLoaiPhim/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiPhim();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiPhim = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiPhim/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLoaiPhim = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLoaiPhim();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiPhim();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMLoaiPhongController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLoaiPhong/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiPhong();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiPhong = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiPhong/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLoaiPhong = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLoaiPhong();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiPhong();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMLoaiVanBanController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMLoaiVanBan/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMLoaiVanBan();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMLoaiVanBan = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiVanBan/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMLoaiVanBan = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMLoaiVanBan();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMLoaiVanBan();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMMucDichKhaiThacController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMMucDichKhaiThac/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMMucDichKhaiThac();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMMucDichKhaiThac = function () {

        $http({
            method: 'GET',
            url: 'api/DMMucDichKhaiThac/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMMucDichKhaiThac = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMMucDichKhaiThac();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMMucDichKhaiThac();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMMucDoMatController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMMucDoMat/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMMucDoMat();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMMucDoMat = function () {

        $http({
            method: 'GET',
            url: 'api/DMMucDoMat/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMMucDoMat = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMMucDoMat();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMMucDoMat();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMMucDoTinCayController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMMucDoTinCay/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMMucDoTinCay();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMMucDoTinCay = function () {

        $http({
            method: 'GET',
            url: 'api/DMMucDoTinCay/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMMucDoTinCay = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMMucDoTinCay();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMMucDoTinCay();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMNgonNguController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMNgonNgu/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMNgonNgu();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMNgonNgu = function () {

        $http({
            method: 'GET',
            url: 'api/DMNgonNgu/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMNgonNgu = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMNgonNgu();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMNgonNgu();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMNguoiKyController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMNguoiKy/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMNguoiKy();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMNguoiKy = function () {

        $http({
            method: 'GET',
            url: 'api/DMNguoiKy/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMNguoiKy = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMNguoiKy();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMNguoiKy();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMNhomVBChuYeuController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMNhomVBChuYeu/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMNhomVBChuYeu();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMNhomVBChuYeu = function () {

        $http({
            method: 'GET',
            url: 'api/DMNhomVBChuYeu/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMNhomVBChuYeu = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMNhomVBChuYeu();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMNhomVBChuYeu();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMTenLoaiHoSoController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMTenLoaiHoSo/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMTenLoaiHoSo();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMTenLoaiHoSo = function () {

        $http({
            method: 'GET',
            url: 'api/DMTenLoaiHoSo/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMTenLoaiHoSo = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMTenLoaiHoSo();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMTenLoaiHoSo();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMTenLoaiVanBanController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMTenLoaiVanBan/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMTenLoaiVanBan();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMTenLoaiVanBan = function () {

        $http({
            method: 'GET',
            url: 'api/DMTenLoaiVanBan/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMTenLoaiVanBan = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMTenLoaiVanBan();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMTenLoaiVanBan();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMThoiHanBaoQuanController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMThoiHanBaoQuan/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMThoiHanBaoQuan();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMThoiHanBaoQuan = function () {

        $http({
            method: 'GET',
            url: 'api/DMThoiHanBaoQuan/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMThoiHanBaoQuan = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMThoiHanBaoQuan();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMThoiHanBaoQuan();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMTinhTrangVatLyController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMTinhTrangVatLy/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMTinhTrangVatLy();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMTinhTrangVatLy = function () {

        $http({
            method: 'GET',
            url: 'api/DMTinhTrangVatLy/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMTinhTrangVatLy = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMTinhTrangVatLy();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMTinhTrangVatLy();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);

angular.module('WebApiApp').controller('DMVatMangTinController', ['$rootScope', '$scope', '$http', '$cookies', '$uibModal', '$settings', function ($rootScope, $scope, $http, $cookies, $uibModal, $settings) {

    $scope.Paging = {
        "searchKey": '',
        "pageSize": 15,
        "totalCount": 0,
        "totalPage": 0,
        "currentPage": 1,
    };
    $scope.Del = function (Id) {
        if (confirm('Bạn có chắc chắn muốn xóa ?'))
            $http({
                method: 'GET',
                url: 'api/DMVatMangTin/DelKv?Id=' + Id,
            }).then(function successCallback(response) {
                toastr.success('Xóa dữ liệu thành công !', 'Thông báo');
                $rootScope.LoadDMVatMangTin();
            }, function errorCallback(response) {
                //$scope.itemError = response.data;
                toastr.error('Có lỗi trong quá trình xóa dữ liệu !', 'Thông báo');
            });

    }
    $rootScope.LoadDMVatMangTin = function () {

        $http({
            method: 'GET',
            url: 'api/DMVatMangTin/Get?pageNumber=' + $scope.Paging.currentPage + '&pageSize=' + $scope.Paging.pageSize + '&searchKey=' + $scope.Paging.searchKey
        }).then(function successCallback(response) {

            $scope.DMVatMangTin = response.data.data;
            $scope.Paging.totalCount = response.data.totalCount;
            $scope.Paging.pageStart = response.data.pageStart;
            $scope.Paging.totalPage = response.data.totalPage;
            $('#displayPage').html("Trang " + $scope.Paging.currentPage + "/" + $scope.Paging.totalPage)
            $('#show_paginator').bootpag({
                total: $scope.Paging.totalPage,
                page: $scope.Paging.currentPage,
                maxVisible: 10
            }).on('page', function (event, num) {
                $scope.Paging.currentPage = num;
                $rootScope.LoadDMVatMangTin();
                if (num == null) num = 1
            });

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }

    $rootScope.LoadDMVatMangTin();
    $scope.$on('$viewContentLoaded', function () {

        ComponentsSelect2.init();


    });

}]);
