/***
Metronic AngularJS App Main Script
***/
/* Metronic App */

var $stateProviderRef = null;
var WebApiApp = angular.module("WebApiApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngCookies",
    "angularUtils.directives.dirPagination",
    "angular.filter",
    "summernote"
    //'ng.ckeditor'
    //"summernote",
    //'blueimp.fileupload'
]).filter('unique', function () {
    return function (collection, primaryKey) { //no need for secondary key
        var output = [],
            keys = [];
        var splitKeys = primaryKey.split('.'); //split by period


        angular.forEach(collection, function (item) {
            var key = {};
            angular.copy(item, key);
            for (var i = 0; i < splitKeys.length; i++) {
                key = key[splitKeys[i]];    //the beauty of loosely typed js :)
            }

            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});
WebApiApp.filter('removeHTMLTags', function () {
    return function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});

//WebApiApp.config(function (paginationTemplateProvider) {
//    paginationTemplateProvider.setPath('js/tempPagination/dirPagination.tpl.html');
//});
/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
WebApiApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({

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
            pageSidebarClosed: true, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load

        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout',
    };
    return $settings;
}]);
//WebApiApp.factory('Excel', function ($window) {
//    var uri = 'data:application/vnd.ms-excel;base64,',
//        template = '<!--[if gte mso 9]&gt;{worksheet}&lt;![endif]--><table>{table}</table>',
//        base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
//        format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
//    return {
//        tableToExcel: function (tableId, worksheetName) {
//            var table = $(tableId),
//                ctx = { worksheet: worksheetName, table: table.html() },$scope.LoadTreeTextOrg
//                href = uri + base64(format(template, ctx));
//            return href;
//        }
//    };
//})
/* Setup App Main Controller */
WebApiApp.controller('AppController', ['$q', '$stateParams', '$scope', '$rootScope', '$http', '$uibModal', '$cookies', '$state', function ($q,$stateParams, $scope, $rootScope, $http, $uibModal, $cookies, $state) {
    //$scope.$on('$viewContentLoaded', function () {
    //    App.initAjax();
    //    //ComponentsSelect2.init();
    //});
    //$scope.options = {
    //    height: 300,
    //    focus: true,
    //    airMode: true,
    //    toolbar: [
    //        ['edit', ['undo', 'redo']],
    //        ['headline', ['style']],
    //        ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
    //        ['fontface', ['fontname']],
    //        ['textsize', ['fontsize']],
    //        ['fontclr', ['color']],
    //        ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
    //        ['height', ['height']],
    //        ['table', ['table']],
    //        ['insert', ['link', 'picture', 'video', 'hr']],
    //        ['view', ['fullscreen', 'codeview']],
    //        ['help', ['help']]
    //    ]
    //};
    $scope.AuthorizationPermission = function (permission, fcode) {
        var bool = false;
        var it = $rootScope.listPer.filter(x => x.FCode === fcode & x.CodePermission.includes('$' + permission + '=TRUE$'));

        if (it.length > 0) {
            bool = true;
        }
        return bool;
    }
    $scope.GroupType = [
        { value: 'link', name: 'Nhóm liên kết' },
        { value: 'gallery', name: 'Nhóm ảnh' },
        { value: 'video', name: 'Nhóm video' },
    ]
    $scope.UrlType = [
        { value: '_blank', name: 'Mở cửa sổ mới' },
        { value: '_parent', name: 'Mở tại cửa sổ cha' },
        { value: '_self', name: 'Mở liên kết tại cửa sổ hiện tại' },
        { value: '_top', name: 'Mở liên kết trên cửa sổ đầu tiên' },
    ]
    $scope.DocumentType = [
        { value: 'a', name: 'a' },
        { value: 'b', name: 'b' },
        { value: 'c', name: 'c' },
        { value: 'd', name: 'd' },
    ]
    $scope.ShowIndex = function (index, pagenumber, pagesize) {
        if (pagenumber == 1)
            return index
        else
            return index + (pagenumber - 1) * pagesize
    }
    $scope.config = {};
    $scope.config.toolbarGroups = [
        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
        { name: 'clipboard', groups: ['clipboard', 'undo'] },
        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: ['forms'] },
        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
        { name: 'links', groups: ['links'] },
        { name: 'insert', groups: ['insert'] },
        { name: 'styles', groups: ['styles'] },
        { name: 'colors', groups: ['colors'] },
        { name: 'document', groups: ['mode', 'document', 'doctools'] },
        { name: 'tools', groups: ['tools'] },
        { name: 'others', groups: ['others'] },
        { name: 'about', groups: ['about'] }
    ];
    $scope.config.removeButtons = 'BGColor,Anchor,Subscript,Superscript,Paste,Copy,Cut,Undo,Redo';


    $scope.optionsEditor = {
        height: 150,
        toolbar: [
            ['style', ['bold', 'italic', 'underline']],
            ['para', ['ul', 'ol']]
        ]
    };
  
    $scope.getPageBar = function (code) {
        var obj = $rootScope.sidebar.filter(t => t.FCode == code);
        if (obj != null && obj.length > 0)
            return obj[0].FName;
        else return '';
    }
    // Lấy danh sách Menu chính
    $scope.LoadMainMenus = function () {
        $http({
            method: 'GET',
            url: '/api/MainMenus'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.MainMenu = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadBM = function () {
        $http({
            method: 'GET',
            url: '/api/getBM'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.BM = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadDropAreas = function () {
        $http({
            method: 'GET',
            url: '/Org/loadAreas'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.DropAreas = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadLHDN = function () {
        $http({
            method: 'GET',
            url: '/api/getLHDN'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.LHDN = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.LoadGroups = function () {
        $http({
            method: 'GET',
            url: '/api/Groups'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Group = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.DropYear = [new Date().getFullYear() - 1,
    new Date().getFullYear(),
    new Date().getFullYear() + 1, new Date().getFullYear() + 2
        , new Date().getFullYear() + 3
        , new Date().getFullYear() + 4
        , new Date().getFullYear() + 5
        , new Date().getFullYear() + 6
        , new Date().getFullYear() + 7
        , new Date().getFullYear() + 8
        , new Date().getFullYear() + 9
        , new Date().getFullYear() + 10
        , new Date().getFullYear() + 11
        , new Date().getFullYear() + 12
        , new Date().getFullYear() + 13
        , new Date().getFullYear() + 14
        , new Date().getFullYear() + 15
        , new Date().getFullYear() + 16
        , new Date().getFullYear() + 17
        , new Date().getFullYear() + 18

    ]
    $scope.displayPage = [
        {
            "value": 15,
            "text": '15 bản ghi',
        },
        {
            "value": 25,
            "text": '25 bản ghi',
        },
        {
            "value": 50,
            "text": '50 bản ghi',
        },
        {
            "value": 75,
            "text": '75 bản ghi',
        },
        {
            "value": 100,
            "text": '100 bản ghi',
        }
    ]

    $scope.openEditMainMenuModal = function (itemMainMenu) {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditMainMenu.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelMainMenuHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'full',
            resolve: {
                itemMainMenu: function () { return itemMainMenu }
            }
        });
    }
    $scope.LoadCD = function () {
        $http({
            method: 'GET',
            url: '/api/GetAllChucDanh'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.ChucDanh = response.data;
            // console.log($scope.ChucDanh);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    // Lấy danh sách quyền
    $scope.LoadPermissions = function () {
        $http({
            method: 'GET',
            url: '/api/Permissions'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Permission = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    // Modal Edit Permission
    $scope.openEditPermissionModal = function (itemPermission) {
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditPermission.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelPermissionHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'full',
            resolve: {
                itemPermission: function () { return itemPermission }
            }
        });
    }
    // Lấy danh sách công ty
    $scope.LoadCompanies = function () {
        $http({
            method: 'GET',
            url: '/api/Companies'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Company = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu Companies!', 'Thông báo');
        });
    }

    $scope.DefaultArea = "35";
    $scope.DefaultOrganization = 'SCTHANAM';
    $scope.LoadProvin = function (ProvinId, DistrictId, WardId) {
        //if (ProvinId != "0") {
        //    $http({
        //        method: 'GET',
        //        url: '/Area/TINH/' + ProvinId,
        //    }).then(function successCallback(response) {
        //        // this callback will be called asynchronously
        //        // when the response is available
        //        $scope.Provin = response.data;
        //    }, function errorCallback(response) {
        //        // called asynchronously if an error occurs
        //        // or server returns response with an error status.
        //        toastr.warning('Có lỗi trong quá trình tải dữ liệu Provin!', 'Thông báo');
        //    });
        //}
        if (ProvinId == "0") {
            $http({
                method: 'GET',
                url: '/Area/TINH/' + ProvinId,
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.Provin = response.data;
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                toastr.warning('Có lỗi trong quá trình tải dữ liệu Provin!', 'Thông báo');
            });
        }
        else {
            if (DistrictId == "0") {
                $http({
                    method: 'GET',
                    url: '/Area/HUYEN/' + ProvinId,
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.District = response.data;

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu District!', 'Thông báo');
                });
            }
            else {
                $http({
                    method: 'GET',
                    url: '/Area/HUYEN/' + ProvinId,
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.District = response.data;

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu District!', 'Thông báo');
                });

                $http({
                    method: 'GET',
                    url: '/Area/XA/' + DistrictId,
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.Ward = response.data;

                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu District!', 'Thông báo');
                });
            }

        }
    }

    $scope.LoadDeparment = function (CoCode, type) {
        if (CoCode == '' || CoCode == 'undifined')
            return;
        $http({
            method: 'GET',
            url: '/Org/TreeText/' + CoCode + '/' + type
        }).then(function successCallback(response) {

            $scope.TreeTextDeparment = response.data;
        }, function errorCallback(response) {

            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }




    // Lấy danh sách Menu hệ thống
    $scope.LoadMenus = function () {
        $http({
            method: 'GET',
            url: '/api/Menus'
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.Menu = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });

    }
    //Lấy danh sách quyền
    $scope.GetPermission = function () {
        $http({
            method: 'GET',
            url: '/api/ApiMenus/GetPermission/'
        }).then(function successCallback(response) {
            $scope.Permission = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.getDropStep = function (fcode) {
        $http({
            method: 'GET',
            url: '/Org/loadDropStep/' + fcode,
        }).then(function successCallback(response) {
            $scope.DropStep = response.data;
            // console.log(response.data);
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    // Lấy danh sách Menu hệ thống
    $scope.GetDropMenu = function () {
        $http({
            method: 'GET',
            url: '/api/ApiMenus/GetMenusByLevel/'
        }).then(function successCallback(response) {
            $scope.DropMenu = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    $scope.GetDropCMSCategories = function () {
        $http({
            method: 'GET',
            url: '/api/ApiCMS_Categories/GetCMS_CategoriesByLevel'
        }).then(function successCallback(response) {
            $scope.DropMenu = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    $scope.GetMenusByLevel = function () {

        $http({
            method: 'GET',
            url: '/api/ApiMenus/GetMenusByLevel/'
        }).then(function successCallback(response) {
            $scope.MenuLevel = response.data;

        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    // Lấy ID tự động
    $scope.AutoID = function (Code) {

        $http({
            method: 'POST',
            url: '/AutoId/' + Code
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.objAutoID = response.data;
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tạo ID tự động !', 'Thông báo');
        });
    }
    // Lấy ID tự động
    $scope.AutoIDCallBack = function (Code, res) {

        $http({
            method: 'POST',
            url: '/AutoId/' + Code
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.objAutoID = response.data;
            // console.log(response.data)
            return res(response.data);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            toastr.warning('Có lỗi trong quá trình tạo ID tự động !', 'Thông báo');
            return res(response);
        });
    }
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

    $scope.openModalHtml = function (item, html, modal, check) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/Modal/Modal' + html + '.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'Modal' + modal + 'HandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item },
                check: function () { return check }
            }
        });

    }
    $scope.openModalItem = function (item, Code, size, Controller, tempUrl) {
        if (item.FBranchCode == null)
            item.FBranchCode = Code;
        var templateUrl = 'views-client/' + tempUrl + '.html?bust=' + Math.random().toString(36).slice(2);;//'views-client/template/Edit' + type + '.html?bust=' + Math.random().toString(36).slice(2);
        var controller = Controller;// 'Model' + type + 'HandlerController';
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: size,
            resolve: {
                itemModal: function () { return item }
            }
        });

    }
    $scope.openModal = function (item, type, check) {
        
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/Modal/Modal' + type + '.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'Modal' + type + 'HandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item },
                check: function () { return check }
            }
        });

    }
    $scope.openEditMenuModal = function (itemMenu) {

        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: 'views-client/template/EditMenu.html?bust=' + Math.random().toString(36).slice(2),
            controller: 'ModelMenuHandlerController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            resolve: {
                itemMenu: function () { return itemMenu }
            }
        });
    }

    $scope.openEditObjectItem = function (item, type, Code) {
        if (item.FBranchCode == null)
            item.FBranchCode = Code;
        var templateUrl = 'views-client/template/Edit' + type + '.html?bust=' + Math.random().toString(36).slice(2);
        var controller = 'Model' + type + 'HandlerController';
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                item: function () { return item }
            }

        });


    }

    $scope.openNewItem = function (itemUser, type, Code) {
        if (itemUser.FBranchCode == null)
            itemUser.FBranchCode = Code;
        var Type = 'ADD';

        var templateUrl = 'views-client/template/Edit' + type + '.html?bust=' + Math.random().toString(36).slice(2);
        var controller = 'Model' + type + 'HandlerController';
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                itemUser: function () { return itemUser },
                Type: function () { return Type }
            }

        });


    }
    $scope.openViewItem = function (itemUser, type, Code) {
        if (itemUser.FBranchCode == null)
            itemUser.FBranchCode = Code;
        var Type = 'VIEW';

        var templateUrl = 'views-client/template/Edit' + type + '.html?bust=' + Math.random().toString(36).slice(2);
        var controller = 'Model' + type + 'HandlerController';
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                itemUser: function () { return itemUser },
                Type: function () { return Type }
            }

        });


    }
    $scope.openEditItem = function (itemUser, type, Code) {
        if (itemUser.FBranchCode == null)
            itemUser.FBranchCode = Code;
        var Type = 'EDIT';


        var templateUrl = 'views-client/template/Edit' + type + '.html?bust=' + Math.random().toString(36).slice(2);
        var controller = 'Model' + type + 'HandlerController';
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            animation: true,
            ariaDescribedBy: 'modal-body',
            templateUrl: templateUrl,
            controller: controller,
            controllerAs: 'vm',
            scope: $scope,
            backdrop: 'static',
            size: 'lg',
            index: 10000,
            resolve: {
                itemUser: function () { return itemUser },
                Type: function () { return Type }
            }

        });


    }

    $scope.LoadOrg = function () {
        $http({
            method: 'GET',
            url: '/api/Organizations'
        }).then(function successCallback(response) {
            $scope.Organizations = response.data;
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    $scope.LogOut = function () {
        $http({
            method: 'POST',
            url: 'api/Account/Logout'
        }).then(function successCallback(response) {
            $cookies.remove("username");
            $cookies.remove("token_type");
            $cookies.remove("token");
            window.location.assign('/login.html');
        }, function errorCallback(response) {
            toastr.warning('Đăng xuất thất bại!', 'Thông báo');
        });
    }

    $scope.LoadTreeText = function (dataAll) {
        //debugger
        var tree = [];
        var arrparent = dataAll.filter(t => t.FParent == null || t.FParent == '');
        var i = 1;
        angular.forEach(arrparent, function (item) {
            item.FName = i + '.' + item.FName;
            tree.push(item);
            var arrChild = dataAll.filter(t => t.FParent == item.FCode);
            if (arrChild.length > 0)
                $scope.LoadChildText(dataAll, arrChild, i, tree);
            i = i + 1;
        });
        return tree;
    }
    $scope.LoadChildText = function (dataAll, data, j, arr) {

        //var arrChild = dataAll.filter(t => t.FParent == item.Fcode);
        var i = 1;
        angular.forEach(data, function (item) {
            var stt = j + '.' + i;
            item.FName = stt + '. ' + item.FName;
            arr.push(item);
            var arrChild = dataAll.filter(t => t.FParent == item.FCode);
            if (arrChild.length > 0)
                $scope.LoadChildText(dataAll, arrChild, stt, arr);
            i = i + 1;
        });
    }
    $scope.LoadTreeTextOrg = function () {
        $http({
            method: 'GET',
            url: '/Org/TreeText/' + $scope.DefaultOrganization + '/ALL'
        }).then(function successCallback(response) {
            $scope.TreeTextOrgs = response.data;
            //$scope.TreeTextOrgs.shift();
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }

    $rootScope.LoaiSanPham = [
        { FCode: 'HOTRO', FName: 'Sản phẩm công nghệ hỗ trợ' },
        { FCode: 'HOANCHINH', FName: 'Sản phẩm hoàn chỉnh' }
    ]
    $rootScope.getNameLoaiSP = function (item) {
        let rs = '';
        if ($rootScope.LoaiSanPham.find(s=>s.FCode == item) != null)
            rs = $rootScope.LoaiSanPham.find(s=>s.FCode == item).FName;
        return rs;
    }
    //Quân them    
    $rootScope.PhanLoaiTree = function (strphanloai,strLVSXChinh) {
        $rootScope.LVSXChinh =strLVSXChinh!=null&&strLVSXChinh!=''? JSON.parse(strLVSXChinh):$rootScope.LVSXChinh=[] 
        $rootScope.PLGCList = strphanloai != '' ? strphanloai.split(",") : $rootScope.PLGCList = []
        if ($rootScope.LVSXChinh.length == 0) {
            $rootScope.NameLvsxChinh = ''
        }
        $http({
            method: 'GET',
            url: 'api/DMLinhVucDN/PhanLoaiGiaCong',
            params: { phanloai: strphanloai }
        }).then(function successCallback(response) {
          
            $("#tree_phanloai").jstree({
                "core": {
                    "themes": {
                        "responsive": false
                    },
                    // so that create works
                    "check_callback": true,
                    'data': response.data
                },
                "types": {
                    "default": {
                        "icon": "fa fa-folder icon-state-warning icon-lg"
                    },
                    "file": {
                        "icon": "fa fa-file icon-state-warning icon-lg"
                    }
                },
                "checkbox": {
                    "keep_selected_style": false
                },
                "state": { "key": "demo2" },
                "plugins": ["dnd", "state", "types", "checkbox"]

            });
            
            $('#tree_phanloai').jstree(true).refresh();
            
            $('#tree_phanloai').jstree(true).settings.core.data = response.data;
            $('#tree_phanloai').jstree(true).load_node('#')
        ///   
          //
            //  console.log(response.data)
            
        }, function errorCallback(response) {

            toastr.error('Có lỗi xẩy ra trong quá trình cập nhật dữ liệu !', 'Lỗi cập nhật dữ liệu');
        });
    }
    
    $scope.loadNameLVSX = function (arr) {
        //api/DoanhNghiep/getLvSxChinh
        $rootScope.NameLvsxChinh = ''
        $http({
            method: 'POST',
            url: 'api/DoanhNghiep/getLvSxChinh',
            data:arr
        }).then(function successCallback(response) {
          //  console.warn(response.data);
            if (response.data!='')
                $rootScope.NameLvsxChinh = response.data.substring(0, response.data.length - 2)
         
            //$scope.TreeTextOrgs.shift();
        }, function errorCallback(response) {
            toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $rootScope.onChoiceNode = function () {
        setTimeout(function () {
            $('#tree_phanloai').on("select_node.jstree", function (e, data) {
                if (data.node.id != '#') {
                    if (data.node.parent == "#") {
                        let treeNode = $('#tree_phanloai').jstree(true).get_node(data.node.id)
                        let tmpChild = treeNode.children;
                        angular.forEach(tmpChild, (value) => {
                            if ($rootScope.PLGCList.findIndex(s=>s == value) == -1) {
                                $rootScope.PLGCList.push(value)
                            }
                        })
                        $rootScope.LVSXChinh.push(data.node.id)
                        $scope.loadNameLVSX($rootScope.LVSXChinh);
                    } else {
                        let tmp1 = $rootScope.PLGCList.findIndex(s=>s == data.node.id);
                        if (tmp1 == -1) {
                            $rootScope.PLGCList.push(data.node.id)
                        }
                       // $rootScope.PLGCList.push(data.node.id)
                        let tmp = $rootScope.LVSXChinh.findIndex(s=>s == data.node.parent);
                        if (tmp == -1) {
                            $scope.loadNameLVSX($rootScope.LVSXChinh);
                            $rootScope.LVSXChinh.push(data.node.parent)
                        }
                    }
                   
                }

            });
            $("#tree_phanloai").on("deselect_node.jstree", function (e, data) {
                if (data.node.id != '#') {
                    if (data.node.parent == "#") {
                        let tmpId = $rootScope.LVSXChinh.findIndex(s=>s == data.node.id);
                        let treeNode = $('#tree_phanloai').jstree(true).get_node(data.node.id)
                        let tmpChild = treeNode.children;
                        if (tmpId > -1) {
                            $rootScope.LVSXChinh.splice(tmpId, 1);
                            $rootScope.PLGCList = $rootScope.PLGCList.filter((el) => !tmpChild.includes(el));
                            $scope.loadNameLVSX($rootScope.LVSXChinh);
                        }
                    } else {
                        let treeNode = $('#tree_phanloai').jstree(true).get_node(data.node.parent)
                        let tmpChild = treeNode.children;
                        let tmpId = $rootScope.PLGCList.findIndex(s=>s == data.node.id);
                        $rootScope.PLGCList.splice(tmpId, 1);
                        let found = $rootScope.PLGCList.some(r=> tmpChild.indexOf(r) >= 0)
                        //console.warn(,found)

                        // console.warn(tmpChild)
                        if (!found) {
                            let tmpIdpR = $rootScope.LVSXChinh.findIndex(s=>s == data.node.parent);
                            if (tmpIdpR > -1) {
                                $rootScope.LVSXChinh.splice(tmpIdpR, 1);
                                $scope.loadNameLVSX($rootScope.LVSXChinh);
                            }
                        }

                        //let tmp = $rootScope.LVSXChinh.findIndex(s=>s == data.node.parent);
                        //if (tmp == -1) {
                        //    $rootScope.LVSXChinh.push(data.node.parent)
                        //}
                    }
                   
                }
                //   console.log('deselect_node', data)

            });
        }, 500);
    }
}]);//])


WebApiApp.controller("ModelPasswordHandlerController", function ($cookies, $scope, $http, $uibModalInstance) {
    $scope.item = $scope.$resolve.itemUser;
    $scope.cancelModal = function () {
        $uibModalInstance.dismiss('close');
    }
    //  $scope.item.UserName = $cookies.get('username');
    //console.log($cookies.get('username'));
    $scope.SaveModal = function () {

        $http({
            method: 'POST',
            url: '/api/Account/ChangePassword',
            data: $scope.item
        }).then(function successCallback(response) {
            //console.log(response);
            // this callback will be called asynchronously
            // when the response is available
            toastr.success('Thay đổi mật khẩu thành công', 'Thông báo');
            $uibModalInstance.close('save');
        }, function errorCallback(response) {
            $scope.itemError = response.data;
            $scope.LoadError($scope.itemError.ModelState);
        });
    }
});
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
            "hideMethod": "fadeOut",
        }
    });


}]);
WebApiApp.directive('fixedTableHeaders', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function () {

                container = element.parentsUntil(attrs.fixedTableHeaders);
                element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 2 });

            }, 0);
        }
    }
}]);



WebApiApp.run(["$rootScope", "$http", "$cookies", "$settings", "$state", "$stateParams", "$urlRouter", "$cookieStore", '$timeout', function ($rootScope, $http, $cookies, $settings, $state, $stateParams, $cookieStore, $urlRouter, $timeout) {


    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = $settings; // state to be accessed from view
    $rootScope.$stateParams = $stateParams;
    $rootScope.avatar = [];

    $rootScope.ChangeLanguage = function (lang, kyhieu) {

        $http.defaults.headers.common["x-language"] = kyhieu;
        $rootScope.lang = lang;
        $state.reload();
    }

    if ($cookies.get('username') == 'undefined' || $cookies.get('username') == null)
        window.location.assign('/login.html');
    else {
        $http.defaults.headers.common.Authorization = $cookies.get('token_type') + ' ' + $cookies.get('token');
        $http({
            method: 'GET',
            url: '/api/GetCurrentUserProfiles',
            //params: { UserName: $cookies.get('username')}
        }).then(function successCallback(response) {
            $rootScope.user = response.data;
            if ($rootScope.user.Department == 'DOANHNGHIEP') {
                $http.defaults.headers.common["Cache-Control"] = 'no-cache';
                $http.defaults.headers.common["Pragma"] = 'no-cache';
                $http.defaults.headers.common["Expires"] = '0';
                $http.defaults.timeout = 5000;
                $http.defaults.headers.common["x-company"] = $rootScope.user.FBranchCode;
                $http.defaults.headers.common["x-language"] = 'vi-VN';
                $rootScope.lang = 'VN';
                $http.defaults.headers.common["code-dn"] = $rootScope.user.UserName;
               // $urlRouterProvider.otherwise("TTDN");
              //  debugger
                $timeout(function () {
                    $state.go('TTDN');
                });
                $http({
                    method: 'GET',
                    url: '/api/DMNgonNgu/Get?pageNumber=1&pageSize=100&searchKey='
                }).then(function successCallback(response) {
                    $rootScope.DMNgonNgu = response.data.data;
                }, function errorCallback(response) {
                    toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
                });
              //  console.warn($state.go)
            } else {
                $state.go('dashboard');
                $http({
                    method: 'GET',
                    url: '/api/UserProfile/GetDVOfUser',
                }).then(function successCallback(rs) {




                    $cookies.put('DonVi', rs.data.FName);
                    $cookies.put('FCodeDV', rs.data.FCode);
                    $rootScope.DonViTitle = rs.data.FName;
                    $http.defaults.headers.common["Cache-Control"] = 'no-cache';
                    $http.defaults.headers.common["Pragma"] = 'no-cache';
                    $http.defaults.headers.common["Expires"] = '0';
                    $http.defaults.timeout = 5000;
                    $http.defaults.headers.common["x-company"] = rs.data.FCode;
                    $http.defaults.headers.common["x-language"] = 'vi-VN';
                    $rootScope.lang = 'VN';

                    $http({
                        method: 'GET',
                        url: '/api/DMNgonNgu/Get?pageNumber=1&pageSize=100&searchKey='
                    }).then(function successCallback(response) {
                        $rootScope.DMNgonNgu = response.data.data;
                    }, function errorCallback(response) {
                        toastr.warning('Có lỗi trong quá trình tải dữ liệu!', 'Thông báo');
                    });

                }, function errorCallback(response) {
                    //toastr.error('Cập nhật trạng thái không thành công !', 'Thông báo');
                });
            }
           
        }, function errorCallback(response) {

        });
        
        
    };

    onStartInterceptor = function (data, headersGetter) {
        App.startPageLoading({ animate: true });
        //App.startPageLoading({ message: 'Đang tải dữ liệu vui lòng chờ ...', overlayColor: 'red' });
        //////console.log('loading data ...');
        return data;
    }
    onCompleteInterceptor = function (data, headersGetter) {
        App.stopPageLoading();
        //////console.log('End loading data ...');
        return data;
    }
    //////console.log($http.defaults);
    $http.defaults.transformRequest.push(onStartInterceptor);
    $http.defaults.transformResponse.push(onCompleteInterceptor);

    $http({
        method: 'POST',
        url: '/api/getMenuByUser',
    }).then(function successCallback(response) {
        $rootScope.sidebar = response.data;


    }, function errorCallback(response) {

    });

    $http({
        method: 'POST',
        url: '/api/DislayByPermission',
    }).then(function successCallback(response) {
        $rootScope.listPer = response.data;
    }, function errorCallback(response) {
    });



}]);
WebApiApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.deferIntercept();
    $urlRouterProvider.otherwise("/");
    $urlRouterProviderRef = $urlRouterProvider;
    $stateProviderRef = $stateProvider;
    $stateProvider
        .state('CREATE_NOTI', {
            url: "/CREATE_NOTI",
            templateProvider: function ($templateRequest, $stateParams) {



                var templateName = "views-client/template/CreateNoti.html?bust=" + Math.random().toString(36).slice(2);
                return $templateRequest(templateName);
            },

            params: {
                param: null
                //ViewName: null,
                //Controller: null,
                //Title: null
            },
            data: {
                pageTitle: 'QUẢN TRỊ WEBSITE'
            },
            controllerProvider: ['$stateParams', function ($stateParams) {
                var controller = 'CreateNotiController';
                //var arr = $stateParams.param.ControllerName.split('/');
                //if (arr.length > 1) controller = arr[arr.length - 1]; else controller = $stateParams.param.ControllerName;
                return controller;
            }],
            resolve: {

                deps: ['$ocLazyLoad', '$stateParams', function ($ocLazyLoad, $stateParams) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            //'assets/pages/scripts/components-select2.js',
                            // 'js/Service/InspectionService.js',
                            'js/controllers/CreateNotiController.js?bust=' + Math.random().toString(36).slice(2)
                        ]
                    });
                }],

            }
        })

    // Dashboard
    $stateProvider.state('dashboard', {

        url: "/dashboard",
        templateUrl: "views-client/dashboard.html?bust=" + Math.random().toString(36).slice(2),

        data: { pageTitle: 'QUẢN TRỊ WEBSITE' },
        controller: "DashboardController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WebApiApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        '../assets/global/plugins/morris/morris.css',
                        '../assets/global/plugins/morris/morris.min.js',
                        '../assets/global/plugins/morris/raphael-min.js',
                        '../assets/global/plugins/jquery.sparkline.min.js',

                        '../assets/pages/scripts/dashboard.min.js',
                        'js/controllers/DashboardController.js',
                    ]
                });
            }]
        }
    })
        .state('account', {

            url: "/account/" + "?eraseCache=true",
            templateUrl: "views-client/profile/account.html?bust=" + Math.random().toString(36).slice(2),

            data: { pageTitle: 'Hệ thống' },
            controller: "AccountController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'WebApiApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/global/plugins/morris/morris.css',
                            '../assets/global/plugins/morris/morris.min.js',
                            '../assets/global/plugins/morris/raphael-min.js',
                            '../assets/global/plugins/jquery.sparkline.min.js',

                            'js/controllers/AccountController.js',
                        ]
                    });
                }]
            }
        })
    .state('TTDN', {

        url: "/TTDN",
        templateUrl: "views-client/template/DoanhNghiep/ThongTinChung.html?bust=" + Math.random().toString(36).slice(2),

        data: { pageTitle: 'THÔNG TIN DOANH NGHIỆP' },
        controller: "ThongTinDoanhNghiepController",
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'WebApiApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        '../assets/global/plugins/morris/morris.css',
                        '../assets/global/plugins/morris/morris.min.js',
                        '../assets/global/plugins/morris/raphael-min.js',
                        '../assets/global/plugins/jquery.sparkline.min.js',

                       // '../assets/pages/scripts/dashboard.min.js',
                        'js/controllers/DoanhNghiep/ThongTinDoanhNghiepController.js',
                    ]
                });
            }]
        }
    })
    
}]);
WebApiApp.run(['$q', '$rootScope', '$http', '$urlRouter', '$settings', '$cookies',
    function ($q, $rootScope, $http, $urlRouter, $settings, $cookies) {
        $("#DonVi").select2({
            escapeMarkup: function (m) { return m; },
            width: null
        });
        $rootScope.$on('$includeContentLoaded', function () {
            // $rootScope.GetNotificationTTDX();
            Layout.initHeader(); // init header
        });

        $http({
            method: 'GET',
            url: '/api/UserProfiles/GetRoleOfCurentUser',
        }).then(function successCallback(response) {
            $rootScope.CheckDisplay = response.data;
            if ($rootScope.CheckDisplay == '1')
                $rootScope.DonVi = '';
            else $rootScope.DonVi = $cookies.get('FCodeDV');

            //$rootScope.LoadTreeTextOrg();
            //$rootScope.LoadInpection();
        }, function errorCallback(response) {

            });


        $rootScope.$settings.layout.pageContentWhite = true;
        $rootScope.$settings.layout.pageBodySolid = false;
        $rootScope.$settings.layout.pageSidebarClosed = false;
        $http({
            method: 'POST',
            url: '/api/getMenuByUser',
        }).then(function successCallback(response) {
            $rootScope.menu = response.data;
            //console.log($rootScope.menu);
            angular.forEach($rootScope.menu, function (value, key) {

                $stateProviderRef.state(value.FCode, {
                    url: "/" + value.FCode,
                    templateProvider: function ($templateRequest, $stateParams) {

                        if ($stateParams.param == null) $stateParams.param = value;
                        var fiename = value.Url;
                        var templateName = "views-client/template/" + fiename + "?bust=" + Math.random().toString(36).slice(2);
                        return $templateRequest(templateName);
                    },

                    params: {
                        param: null,

                    },
                    data: {
                        pageTitle: 'QUẢN TRỊ WEBSITE'
                    },
                    controllerProvider: ['$stateParams', function ($stateParams) {
                        var controller = '';
                        var arr = value.ControllerName.split('/');
                        if (arr.length > 1) controller = arr[arr.length - 1]; else controller = value.ControllerName;
                        return controller;
                    }],
                    resolve: {

                        deps: ['$ocLazyLoad', '$stateParams', function ($ocLazyLoad, $stateParams) {
                            return $ocLazyLoad.load({
                                name: 'WebApiApp',
                                insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                                files: [
                                    '../assets/global/plugins/morris/morris.css',
                                    '../assets/global/plugins/morris/morris.min.js',
                                    '../assets/global/plugins/morris/raphael-min.js',
                                    '../assets/global/plugins/jquery.sparkline.min.js',
                                    'js/controllers/' + value.ControllerName + '.js?bust=' + Math.random().toString(36).slice(2)
                                ]
                            });
                        }],

                    }
                })
            });


            $urlRouter.sync();
            $urlRouter.listen();

        }, function errorCallback(response) {

        });
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.previousState = fromState;
            $rootScope.previousStateParams = fromParams;
            // $rootScope.pageTitle = $stateParams.param.ControllerName;
            //console.log($stateParams.param.ControllerName);
        });
        $rootScope.toDateTime = function (date) {
            var result = moment(date, 'DD/MM/YYYY').format('MM/DD/YYYY');
            if (result == 'Invalid date')
                return null;
            else return result;
        };

    }]);

