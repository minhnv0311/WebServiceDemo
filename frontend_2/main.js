/***
Metronic AngularJS App Main Script
***/
/* Metronic App */

var $stateProviderRef = null;
var Frontend = angular.module('FrontendApp', [
    "ngRoute",
    //"ui.router",
    "ngCookies",
    //"ui.bootstrap",
    'rev.slider',
    'duScroll',
    "pascalprecht.translate",
    //'slickCarousel'
])
//.value('duScrollDuration', 2000)
//.value('duScrollOffset', 30);

Frontend.factory('$settings', ['$rootScope', function ($rootScope) {
    // supported languages

    var $settings = {
        //layout: {
        //    pageSidebarClosed: true, // sidebar menu state
        //    pageContentWhite: true, // set page content layout
        //    pageBodySolid: false, // solid body color state
        //    pageAutoScrollOnLoad: 1000 // auto scroll to top on page load

        //},
        //assetsPath: 'assets',
        //globalPath: 'assets/global',
        //layoutPath: 'assets/layouts/layout',
    };
    return $settings;
}]);

Frontend.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $http) {
    $locationProvider.hashPrefix('');
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
    $routeProvider
        .when('/:language/', {
            templateUrl: 'frontend_2/views/Home_1.html',
            controller: 'HomeController'
        })
        .when('/:language/page/:page/', {
            templateUrl: 'frontend_2/views/ViewPage.html',
            controller: 'PageController'
        })
        .when('/:language/page/:pageparent/:page', {
            templateUrl: 'frontend_2/views/ViewPage.html',
            controller: 'PageController'
        })
        .when('/:language/category/:parent/', {
            templateUrl: 'frontend_2/views/category.html',
            controller: 'CategoryController'
        })
        .when('/:language/category/:parent/:child', {
            templateUrl: 'frontend_2/views/category.html',
            controller: 'CategoryController'
        })
        .when('/:language/storage/:year', {
            templateUrl: 'frontend_2/views/CategoryStorage.html',
            controller: 'CategoryStorageController'
        })
        .when('/:language/storage/:year/:month', {
            templateUrl: 'frontend_2/views/CategoryStorage.html',
            controller: 'CategoryStorageController'
        })
        .when('/:language/gallery/', {
            templateUrl: 'frontend_2/views/Gallery.html',
            controller: 'GalleryController'
        })
        .when('/:language/gallery/:gallery', {
            templateUrl: 'frontend_2/views/ViewGallery.html',
            controller: 'ViewGalleryController'
        })
        .when('/:language/contactus/', {
            templateUrl: 'frontend_2/views/LienHe.html',
            controller: 'LienHeController'
        })
        .when('/:language/lien-he/', {
            templateUrl: 'frontend_2/views/LienHe.html',
            controller: 'LienHeController'
        })
        .when('/:language/search/:SearchKey', {
            templateUrl: 'frontend_2/views/SearchPage.html',
            controller: 'SearchController'
        })
        .when('/:language/view/:Id/', {
            templateUrl: 'frontend_2/views/ViewNews.html',
            controller: 'NewsController'
        })
        .when('/404/', {
            templateUrl: 'frontend_2/views/404.html',
            controller: 'NotFoundController'
        }).
        otherwise({
            redirectTo: '/vn'
        });

}]);
Frontend.config(function ($translateProvider) {
    $translateProvider
        .useStaticFilesLoader({
            prefix: 'frontend_2/locales/locale-',
            suffix: '.json?' + Math.random().toString(36).slice(2)
        })
        // remove the warning from console log by putting the sanitize strategy
        .useSanitizeValueStrategy('sanitizeParameters')
        .preferredLanguage('vn');

});

Frontend.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}])
Frontend.directive('slickSlider', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function () {
                $(element).slick(scope.$eval(attrs.slickSlider));
            });
        }
    }
});
Frontend.directive('compile', function ($compile, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            $timeout(function () {
                $compile(elem.contents())(scope);
            });
        }
    };
});

/* Setup App Main Controller */
Frontend.controller('HomePageController', ['$sce', '$timeout', '$window', '$routeParams', '$q', '$location', '$scope', '$filter', '$http', '$translate', '$interval', function ($sce, $timeout, $window, $routeParams, $q, $location, $scope, $filter, $http, $translate, $interval) {
    $http.defaults.headers.common["Cache-Control"] = 'no-cache';
    $http.defaults.headers.common["Pragma"] = 'no-cache';
    $http.defaults.headers.common["Expires"] = '0';
    $http.defaults.timeout = 5000;
    $scope.EndTime = false;
    $scope.SearchKey = '';
    $scope.GetLanguage = function () {
        $http({
            method: 'GET',
            url: '/CMS/GetLanguage',
        }).then(function successCallback(response) {
            $scope.language = response.data;
            if ($scope.lang == null || $scope.lang == undefined) $scope.lang = 'vn';
        }, function errorCallback(response) {

        });
    }
    $scope.GetHotNews = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetHotNews',
        }).then(function successCallback(response) {
            $scope.HotNews = response.data.list;
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetBanner = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetBanner',
        }).then(function successCallback(response) {
            $scope.Banner = response.data.list;
            $scope.Banner.forEach(function (value, key) {
                if (value.FStatus == "TOP") {
                    $scope.BannerTop = value;
                }
                if (value.FStatus == "ORG") {
                    $scope.Logo = value;
                }
                if (value.FStatus == "SYSTEM") {
                    $scope.System = value;
                }
                if (value.FStatus == "INTRO") {
                    $scope.Intro = value;
                }
            });
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.GetMenuBar = function () {
        $http({
            method: 'GET',
            url: '/api/CCM_Home/GetMenuBar',
        }).then(function successCallback(response) {
            $scope.MenuBar = response.data.list;
            $scope.MenuP = [];
            $scope.MenuC = [];
            $scope.MenuCh = [];
            $scope.MenuBar.forEach(function (value, key) {
                if (value.FLevel == 2) $scope.MenuP.push(value);
                if (value.FLevel == 3) $scope.MenuC.push(value);
                if (value.FLevel == 4) $scope.MenuCh.push(value);
            });
        }, function errorCallback(response) {
            // toastr.warning('Có lỗi trong quá trình tải dữ liệu !', 'Thông báo');
        });
    }
    $scope.changeLanguage = function (lang, kyhieu, reload) {
        if (reload)
            $location.url('/' + lang)
        $http.defaults.headers.common["x-language"] = kyhieu;
        $translate.use(lang);
        $scope.lang = lang.toLowerCase();
        //console.log($http.defaults.headers.common["x-language"]);
    }
    $scope.$on('$viewContentLoaded', function () {
        $scope.GetLanguage();
        $scope.GetMenuBar();
        $scope.GetHotNews();
        $scope.GetBanner();
    });
}]);

Frontend.run(["$location", "$rootScope", "$http", "$cookies", "$settings", "$cookieStore", '$timeout', function ($location, $rootScope, $http, $cookies, $settings, $cookieStore, $timeout) {

    $http.defaults.headers.common["x-language"] = 'vi-VN';
    //$rootScope.$state = $state; // state to be accessed from view
    //$rootScope.$settings = $settings; // state to be accessed from view
    //$rootScope.$stateParams = $stateParams;
    //$rootScope.avatar = [];

    //$rootScope.ChangeLanguage = function (lang, kyhieu) {

    //$http.defaults.headers.common["x-language"] = kyhieu;
    //$rootScope.lang = lang;
    //console.log($rootScope.lang);
    //console.log($http.defaults.headers.common["x-language"]);
    //$http.defaults.headers.common["x-language"] = kyhieu;
    // $state.reload();
    //}
    //$http({
    //    method: 'GET',
    //    url: '/CMS/GetLanguage',
    //    }).then(function successCallback(response) {
    //        $rootScope.language = response.data;
    //    }, function errorCallback(response) {

    //    });
    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
        $rootScope.locationPath = $location.path();
        var lang = current.params.language;
        var listLang = e.currentScope.$$childTail.language;
        if (listLang != null) {
            var o = listLang.find(x => x.FCode == lang.toUpperCase());
            if (o != null)
                e.currentScope.$$childTail.changeLanguage(o.FCode, o.FLanguage, false);
        }
        else {
            e.currentScope.$$childTail.GetLanguage();
            listLang = e.currentScope.$$childTail.language;
            var o = listLang.find(x => x.FCode == lang.toUpperCase());
            if (o != null)
                e.currentScope.$$childTail.changeLanguage(o.FCode, o.FLanguage, false);
        }
            //$location.url('/vn')
    });

}]);



