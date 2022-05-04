/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var WebApiApp = angular.module("WebApiApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngCookies"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
WebApiApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
WebApiApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global $settings */
WebApiApp.factory('$settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var $settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
    };





    return $settings;
}]);

/* Setup App Main Controller */
WebApiApp.controller('AppController', ['$scope', '$rootScope', '$cookies', '$http', "$state", "$stateParams", "$urlRouter", function ($scope, $rootScope, $cookies, $http, $state, $stateParams, $urlRouter) {
    $scope.$on('$viewContentLoaded', function () {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
        //var auth = $cookies.get('username');
        //console.log(auth);
        console.warn($stateParams)
    });
    $scope.LoadError = function (err) {
        var i = 0;
        for (var prop in err) {
            if (err.hasOwnProperty(prop) && prop != null) {
                toastr.error(err[prop][0], 'Lỗi cập nhật dữ liệu');
                $("#" + prop).focus();
                i++;
                if (i == 1) return;
            }

        }
    }
    
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
       
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
        }
    });
}]);
WebApiApp.controller('RegisterController', ['$scope', '$rootScope', '$cookies', '$http', "$state", "$stateParams", "$urlRouter", '$interval', '$timeout', function ($scope, $rootScope, $cookies, $http, $state, $stateParams, $urlRouter, $interval, $timeout) {
    $scope.isReg=false
   
    $scope.SaveModal = function () {

        //var checked_ids = [];
        //var nodes = $('#tree_phanloai').jstree().get_selected(true);
        //jQuery.each(nodes, function (index, value) {
        //    checked_ids.push(nodes[index].id);
        //});
        $scope.item.PhanLoaiGiaCong = ',,';
        $scope.item.LVSXChinh = JSON.stringify($rootScope.LVSXChinh);
        // $scope.item.FBranchCode = $scope.DefaultOrganization;
        $scope.item.CongCuQuanLy = JSON.stringify($scope.CongCuQuanLy);
        $scope.item.ChuanChatLuong = JSON.stringify($scope.ChuanChatLuong);
        $scope.item.FCode = $scope.item.TenDangNhap
        if (typeof $scope.item.Id == 'undefined' || $scope.item.Id == null || $scope.item.Id == '') {

            $scope.itemRegUser = {
                "UserName": $scope.item.TenDangNhap,
                "Email": $scope.item.Email,
                "PhoneNumber": $scope.item.SoDienThoai,
            };

            $http({
                method: 'POST',
                url: '/api/Account/Register',
                data: $scope.itemRegUser
            }).then(function successCallback(response) {

                $http({
                    method: 'POST',
                    url: 'api/DoanhNghiep/Save',
                    data: $scope.item

                }).then(function successCallback(response) {
                    $scope.isReg = true;
                    $timeout(function () {
                        $scope.back();
                    }, 5000);
                    $scope.countDown = 5;
                    $interval(function () { console.log($scope.countDown--) }, 1000, 0);
                    $scope.item = response.data;
                    $scope.itemError = "";
                    toastr.success('Đăng ký thành công !', 'Thông báo');
                }, function errorCallback(response) {
                    $scope.isReg = false
                    console.log(response.data)
                    $scope.itemError = response.data
                    toastr.error('Vui lòng điền đầy đủ các trường bắt buộc !', 'Thông báo');
                });

            }, function errorCallback(response) {
                $scope.isReg = false
                $scope.itemError = response.data
                $scope.LoadError($scope.itemError.ModelState);
                console.log(response.data)

            });
        }
    }
    $scope.ValidUsername = function () {
        let tmp = $scope.item.TenDangNhap
        if ($scope.item.TenDangNhap == tmp.replace(/[^a-z0-9-_]+/gi, '')) {
            $http({
                method: 'GET',
                url: 'api/DoanhNghiep/ValidUsername?username=' + $scope.item.TenDangNhap,
            }).then(function successCallback(response) {

                if (response.data == null || response.data == [] || response.data == '' || response.data == undefined)
                    toastr.success('Có thể sử dụng Tên đăng nhập này!', 'Thông báo');
                else {
                    toastr.error('Tên đăng nhập này đã sử dụng!', 'Thông báo');
                    $scope.item.TenDangNhap = ''
                }
            }, function errorCallback(response) {

                toastr.error('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
            });
        } else {
            $scope.item.TenDangNhap = ''
            toastr.error('Tên đăng nhập không được chứa kí tự đặc biệt !', 'Thông báo');
        }


    }
    $scope.ValidEmail = function () {

        $http({
            method: 'GET',
            url: 'api/DoanhNghiep/ValidEmail?Email=' + $scope.item.Email,
        }).then(function successCallback(response) {

            if (response.data == null || response.data == [] || response.data == '' || response.data == undefined)
                toastr.success('Có thể sử dụng email này!', 'Thông báo');
            else {
                toastr.error('Email này đã sử dụng!', 'Thông báo');
                $scope.item.Email = ''
            }
        }, function errorCallback(response) {

            toastr.error('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });

    }
    $scope.ValidFCode = function () {

        $http({
            method: 'GET',
            url: 'api/DoanhNghiep/ValidFCode?FCode=' + $scope.item.FCode,
        }).then(function successCallback(response) {

            if (response.data == null || response.data == [] || response.data == '' || response.data == undefined)
                toastr.success('Có thể sử dụng mã số thuế này!', 'Thông báo');
            else {
                toastr.error('Mã số thuế này đã sử dụng!', 'Thông báo');
                $scope.item.FCode = ''
            }
        }, function errorCallback(response) {

            toastr.error('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });

    }
    // console.warn($scope.item.PhanLoaiGiaCong)
    $scope.LoadCongCuQuanLy = function () {

        $http({
            method: 'GET',
            url: 'api/DMCongCu_QL_ChatLuong/GetALL'
        }).then(function successCallback(response) {
            $rootScope.DMCongCuQuanLy = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadTieuChuan = function () {

        $http({
            method: 'GET',
            url: 'api/DMChuanChatLuong/GetALL'
        }).then(function successCallback(response) {
            $rootScope.DMTieuChuan = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.LoadLoaiHinhDN = function () {

        $http({
            method: 'GET',
            url: 'api/DMLoaiHinh_DN/GetALL'
        }).then(function successCallback(response) {
            $rootScope.DMLoaiHinh = response.data;
            console.log(response.data)
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
        });
    }
    $scope.back = function () {
        window.location.pathname = ''
    }
    $scope.$on('$viewContentLoaded', function () {
        // initi    ize core components
        App.initAjax();
        ComponentsSelect2.init();
        //App.init();
        // set default layout mode
        $http({
            method: 'GET',
            url: '/CMS/GetOrg',
        }).then(function successCallback(response) {

            $scope.ListOrg = response.data;
            var org = $scope.ListOrg.find(x => x.IsDefault);
            $http({
                method: 'GET',
                url: '/CMS/GetLanguage',
            }).then(function successCallback(response) {

                var langparam = $stateParams.language;
                var orgcode = $stateParams.orgcode;

                $scope.language = response.data;
                var org = $scope.ListOrg.find(x => x.SitePath == orgcode);
                $http.defaults.headers.common["x-company"] = org.FCode;
                var ngonngu = $scope.language.find(x => x.FCode == angular.uppercase(langparam));
                $http.defaults.headers.common["x-language"] = ngonngu.FLanguage;
                
               
                $scope.LoadCongCuQuanLy();
                $scope.LoadTieuChuan();
                $scope.LoadLoaiHinhDN();
            }, function errorCallback(response) {

            });

        }, function errorCallback(response) {

        });
       
        if ($scope.item != null && $scope.item != '') {
        }
        else {
            $scope.item = {};
            $scope.ChuanChatLuong = JSON.parse('[""]');
            $scope.CongCuQuanLy = JSON.parse('[""]');
        }
    });
    
}]);
/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
WebApiApp.controller('HeaderController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
WebApiApp.controller('SidebarController', ['$state', '$scope', function ($state, $scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar($state); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
WebApiApp.controller('QuickSidebarController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        setTimeout(function () {
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
WebApiApp.controller('ThemePanelController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
WebApiApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "1000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    });


}]);

/* Setup Rounting For All Pages */
WebApiApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // Redirect any unmatched url
    //$locationProvider.html5Mode(true);
    //if ($cookies.get('username') == null) {
    $urlRouterProvider.otherwise("/:language/:org");
    //}
    //else {
    //    $urlRouterProvider.otherwise("dashboard");
    //}

    $stateProvider
         // Dashboard
        .state('/:language/:orgcode', {
            url: "/:language/:orgcode",
            templateUrl: "views-client/Account/register.html",
            data: { pageTitle: 'Đăng ký' },
            controller: "RegisterController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/pages/css/login-5.min.css',
                            '../assets/global/plugins/ladda/ladda-themeless.min.css',
                            '../assets/global/scripts/app.min.js',
                           // 'js/controllers/LoginController.js',
                        ]
                    });
                }]

            }
        })
       
}]);

/* Init global $settings and run the app */
WebApiApp.run(["$rootScope", "$settings", "$state", function ($rootScope, $settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = $settings; // state to be accessed from view

}]);



